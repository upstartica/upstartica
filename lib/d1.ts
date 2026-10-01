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

  // Try Cloudflare REST API first if token is available
  const apiRes = await queryViaCloudflareApi<T>(sql, params);
  if (apiRes !== null) return apiRes;

  // Fallback for local dev: query live REMOTE Cloudflare D1 database via wrangler CLI
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

  // Try Cloudflare REST API first if token is available
  const apiRes = await executeViaCloudflareApi(sql, params);
  if (apiRes) return true;

  // Fallback for local dev: write directly to live REMOTE Cloudflare D1 database via wrangler CLI
  return await fallbackRemoteExecute(sql, params);
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

async function queryViaCloudflareApi<T>(sql: string, params: any[] = []): Promise<T[] | null> {
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!apiToken) return null;

  try {
    const singleLineSql = sql.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql: singleLineSql, params }),
      }
    );
    if (!res.ok) return null;
    const json = await res.json();
    if (json.success && json.result && json.result[0]?.results) {
      return json.result[0].results as T[];
    }
  } catch (e: any) {
    console.warn("Cloudflare REST API query warning:", e.message);
  }
  return null;
}

async function executeViaCloudflareApi(sql: string, params: any[] = []): Promise<boolean> {
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!apiToken) return false;

  try {
    const singleLineSql = sql.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql: singleLineSql, params }),
      }
    );
    if (!res.ok) return false;
    const json = await res.json();
    return !!json.success;
  } catch (e: any) {
    console.warn("Cloudflare REST API execute warning:", e.message);
  }
  return false;
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
