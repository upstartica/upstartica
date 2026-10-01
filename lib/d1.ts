/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCloudflareContext } from "@opennextjs/cloudflare";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || "23dee1132725a949cd55a43d25ba9f2d";
const DATABASE_ID = process.env.CLOUDFLARE_DATABASE_ID || "99fbb4a5-b1db-4de3-92a6-f3e42fa4a724";

/**
 * Gets the Cloudflare D1 Database binding from OpenNext context if available.
 */
export async function getD1(): Promise<any> {
  try {
    const { env } = await getCloudflareContext();
    if (env && (env as any).DB) {
      return (env as any).DB;
    }
  } catch {
    // getCloudflareContext fails outside Cloudflare Worker runtime (e.g. standard next dev / vercel build)
  }
  return null;
}

/**
 * Execute a SQL query (SELECT) with parameters against D1.
 * Returns array of results.
 */
export async function queryD1<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const db = await getD1();
  if (db) {
    const stmt = db.prepare(sql);
    const bound = params.length > 0 ? stmt.bind(...params) : stmt;
    const res = await bound.all();
    return (res.results as T[]) || [];
  }

  // Cloudflare REST API (works anywhere, e.g. Vercel) when credentials are configured
  const apiRes = await queryViaCloudflareApi<T>(sql, params);
  if (apiRes !== null) return apiRes;

  // Fallback for local dev only: query live REMOTE Cloudflare D1 database via wrangler CLI
  assertLocalFallbackAllowed();
  return await fallbackRemoteQuery<T>(sql, params);
}

/**
 * Execute a single SQL statement (INSERT, UPDATE, DELETE) with parameters.
 */
export async function executeD1(sql: string, params: any[] = []): Promise<boolean> {
  const db = await getD1();
  if (db) {
    const stmt = db.prepare(sql);
    const bound = params.length > 0 ? stmt.bind(...params) : stmt;
    await bound.run();
    return true;
  }

  // Cloudflare REST API (works anywhere, e.g. Vercel) when credentials are configured
  const apiRes = await executeViaCloudflareApi(sql, params);
  if (apiRes) return true;

  // Fallback for local dev only: write to live REMOTE Cloudflare D1 database via wrangler CLI
  assertLocalFallbackAllowed();
  return await fallbackRemoteExecute(sql, params);
}

/**
 * The wrangler CLI fallback only works on a developer machine. In production
 * (Vercel etc.) fail loudly with an actionable message instead of silently.
 */
function assertLocalFallbackAllowed(): void {
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    throw new Error(
      "D1 is not reachable: set CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_DATABASE_ID in the environment."
    );
  }
}

function formatSqlWithParams(sql: string, params: any[]): string {
  // Strip all newlines and collapse spaces so Windows CLI string parsing does not break
  const singleLineSql = sql.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
  let index = 0;
  return singleLineSql.replace(/\?/g, () => {
    const val = params[index++];
    if (val === null || val === undefined) return "NULL";
    if (typeof val === "number" || typeof val === "boolean") return String(val);
    return `'${String(val).replace(/'/g, "''")}'`;
  });
}

function getApiHeaders(): Record<string, string> | null {
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (apiToken) {
    return {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    };
  }

  const globalKey = process.env.CLOUDFLARE_GLOBAL_API_KEY;
  const email = process.env.CLOUDFLARE_EMAIL || process.env.GMAIL_USER;
  if (globalKey && email) {
    return {
      "X-Auth-Email": email,
      "X-Auth-Key": globalKey,
      "Content-Type": "application/json",
    };
  }

  return null;
}

async function runCloudflareApi(sql: string, params: any[]): Promise<any[] | null> {
  const headers = getApiHeaders();
  if (!headers) return null;

  const singleLineSql = sql.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
  let res: Response;
  try {
    res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ sql: singleLineSql, params }),
      }
    );
  } catch (e: any) {
    throw new Error(`Cloudflare D1 API request failed: ${e.message}`);
  }

  const json: any = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    const detail = json?.errors?.map((x: any) => `${x.code}: ${x.message}`).join("; ") || `HTTP ${res.status}`;
    console.error("Cloudflare D1 API error:", detail);
    throw new Error(`Cloudflare D1 API error (${detail})`);
  }
  return json.result || [];
}

async function queryViaCloudflareApi<T>(sql: string, params: any[] = []): Promise<T[] | null> {
  const result = await runCloudflareApi(sql, params);
  if (result === null) return null;
  return (result[0]?.results as T[]) || [];
}

async function executeViaCloudflareApi(sql: string, params: any[] = []): Promise<boolean> {
  const result = await runCloudflareApi(sql, params);
  return result !== null;
}

async function fallbackRemoteQuery<T>(sql: string, params: any[] = []): Promise<T[]> {
  const { execSync } = await import("child_process");
  const formattedSql = formatSqlWithParams(sql, params);
  try {
    const output = execSync(
      `npx wrangler d1 execute upstartica --remote --command "${formattedSql.replace(/"/g, '\\"')}" --json`,
      { encoding: "utf-8", cwd: process.cwd() }
    );
    const parsed = JSON.parse(output);
    if (Array.isArray(parsed) && parsed[0]?.results) {
      return parsed[0].results as T[];
    }
  } catch (e: any) {
    console.error("Remote D1 fallback query error:", e.message);
  }
  return [];
}

async function fallbackRemoteExecute(sql: string, params: any[] = []): Promise<boolean> {
  const { execSync } = await import("child_process");
  const formattedSql = formatSqlWithParams(sql, params);
  try {
    execSync(
      `npx wrangler d1 execute upstartica --remote --command "${formattedSql.replace(/"/g, '\\"')}"`,
      { encoding: "utf-8", cwd: process.cwd() }
    );
    return true;
  } catch (e: any) {
    console.error("Remote D1 fallback execute error:", e.message);
    return false;
  }
}

