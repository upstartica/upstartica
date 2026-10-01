/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { queryD1, executeD1 } from "@/lib/d1";

const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ?? "default";
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? "default";
const endpoint = process.env.CLOUDFLARE_R2_ENDPOINT ?? "https://default.r2.cloudflarestorage.com";

const staticCredentialProvider = async () => ({ accessKeyId, secretAccessKey });

export const r2Client = new S3Client({
  region: "auto",
  endpoint,
  credentials: staticCredentialProvider,
});

export async function uploadToR2(key: string, body: Buffer | Uint8Array | string, contentType: string) {
  return await r2Client.send(new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: body,
    ContentType: contentType,
  }));
}

export async function getR2SignedUrl(key: string, expiresInSeconds = 3600) {
  return await getSignedUrl(r2Client, new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  }), { expiresIn: expiresInSeconds });
}

async function readR2Json(key: string): Promise<any> {
  const response = await r2Client.send(new GetObjectCommand({ Bucket: bucketName, Key: key }));
  if (!response.Body) return null;
  const chunks: any[] = [];
  // @ts-ignore
  for await (const chunk of response.Body) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString("utf-8"));
}

export async function getCoursesFromR2() {
  try {
    const courses = await queryD1(`
      SELECT id, title, category, image, hours, author, description,
             full_description as fullDescription, students, rating, stars, price
      FROM courses ORDER BY id ASC
    `);
    if (courses && courses.length > 0) return courses;
    return await readR2Json("Public/courses.json") ?? [];
  } catch (error: any) {
    console.warn("Failed to fetch courses from D1/R2, falling back to local data:", error.message);
    const { coursesData } = await import("@/app/data/coursesData");
    return coursesData;
  }
}

export async function findCourseById(id: number) {
  try {
    const courses = await queryD1(`
      SELECT id, title, category, image, hours, author, description,
             full_description as fullDescription, students, rating, stars, price
      FROM courses WHERE id = ?
    `, [id]);
    if (courses && courses.length > 0) return courses[0];
    return await readR2Json(`Public/courses/${id}.json`);
  } catch (error: any) {
    console.warn("Failed to fetch course from D1/R2, falling back to local data:", error.message);
    const { coursesData } = await import("@/app/data/coursesData");
    return coursesData.find((c: any) => c.id === id);
  }
}

export async function findSimilarCourses(currentId: number, limit = 2) {
  const courses = await getCoursesFromR2();
  return courses.filter((c: any) => c.id !== currentId).slice(0, limit);
}

export async function getArticlesFromR2() {
  try {
    const articles = await queryD1(`
      SELECT id, title, description, content, author, date, category, read_time as readTime, image
      FROM articles ORDER BY id ASC
    `);
    if (articles && articles.length > 0) return articles;
    return await readR2Json("Public/articles.json") ?? [];
  } catch (error: any) {
    console.warn("Failed to fetch articles from D1/R2, falling back to local data:", error.message);
    const { articles } = await import("@/app/data/articles");
    return articles;
  }
}

export async function findArticleById(id: number) {
  try {
    const articles = await queryD1(`
      SELECT id, title, description, content, author, date, category, read_time as readTime, image
      FROM articles WHERE id = ?
    `, [id]);
    if (articles && articles.length > 0) return articles[0];
    return await readR2Json(`Public/articles/${id}.json`);
  } catch (error: any) {
    console.warn("Failed to fetch article from D1/R2, falling back to local data:", error.message);
    const { getArticleById } = await import("@/app/data/articles");
    return getArticleById(id);
  }
}

export async function findUserByEmail(email: string) {
  try {
    const users = await queryD1(`
      SELECT email, first_name as firstName, last_name as lastName, password, role, created_at as createdAt
      FROM users WHERE LOWER(email) = ?
    `, [email.toLowerCase().trim()]);
    if (users && users.length > 0) return users[0];
    return await readR2Json(`Public/users/${email.toLowerCase().trim()}.json`);
  } catch (error: any) {
    console.warn("Failed to fetch user from D1/R2:", error.message);
    return null;
  }
}

export async function createUser(email: string, userData: any) {
  const cleanEmail = email.toLowerCase().trim();
  const createdAt = userData.createdAt || new Date().toISOString();

  // Insert into D1 Users table
  try {
    await executeD1(
      `INSERT OR REPLACE INTO users (email, first_name, last_name, password, role, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        cleanEmail,
        userData.firstName || userData.name || '',
        userData.lastName || '',
        userData.password || '',
        userData.role || 'learner',
        createdAt
      ]
    );
  } catch (e: any) {
    console.error("Failed to insert user into D1:", e.message);
  }

  // Backup R2 put object for compatibility
  try {
    await r2Client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: `Public/users/${cleanEmail}.json`,
      Body: JSON.stringify(userData),
      ContentType: "application/json",
    }));
  } catch {
    // ignore R2 fallback error
  }
}

export async function getAllUsers() {
  try {
    const users = await queryD1(`
      SELECT email, first_name as firstName, last_name as lastName, role, created_at as createdAt
      FROM users ORDER BY created_at DESC
    `);
    if (users && users.length > 0) return users;

    const response = await r2Client.send(new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: "Public/users/",
    }));
    if (!response.Contents) return [];

    const r2Users = [];
    for (const item of response.Contents) {
      if (item.Key?.endsWith(".json")) {
        try {
          const u = await readR2Json(item.Key);
          if (u) r2Users.push(u);
        } catch (e) {
          console.warn("Error fetching user", item.Key, e);
        }
      }
    }
    return r2Users;
  } catch (error) {
    console.warn("Error listing users from D1/R2", error);
    return [];
  }
}

export const R2_BUCKET_NAME = bucketName;