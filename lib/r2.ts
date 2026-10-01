/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryD1, executeD1 } from "@/lib/d1";

export const R2_BUCKET_NAME = "powerpreneurs";

/**
 * Stub function for uploading content to KV Store in D1 Database (R2 removed).
 */
export async function uploadToR2(key: string, body: Buffer | Uint8Array | string, _contentType?: string) {
  const contentStr = typeof body === "string" ? body : Buffer.from(body).toString("utf-8");
  return await executeD1(
    `INSERT OR REPLACE INTO kv_store (key, value, updated_at) VALUES (?, ?, ?)`,
    [key, contentStr, new Date().toISOString()]
  );
}

/**
 * Stub function for signed URLs (R2 removed).
 */
export async function getR2SignedUrl(_key: string, _expiresInSeconds = 3600) {
  return "";
}

/**
 * Fetches all courses directly from D1 SQLite Database table 'courses'.
 */
export async function getCoursesFromR2() {
  try {
    const courses = await queryD1(`
      SELECT id, title, category, image, hours, author, description,
             full_description as fullDescription, students, rating, stars, price
      FROM courses ORDER BY id ASC
    `);
    if (courses && courses.length > 0) return courses;

    // Fallback to local static file if database table not yet populated
    const { coursesData } = await import("@/app/data/coursesData");
    return coursesData;
  } catch (error: any) {
    console.warn("Failed to fetch courses from D1 database:", error.message);
    const { coursesData } = await import("@/app/data/coursesData");
    return coursesData;
  }
}

/**
 * Finds a course by ID directly from D1 SQLite Database table 'courses'.
 */
export async function findCourseById(id: number) {
  try {
    const courses = await queryD1(`
      SELECT id, title, category, image, hours, author, description,
             full_description as fullDescription, students, rating, stars, price
      FROM courses WHERE id = ?
    `, [id]);
    if (courses && courses.length > 0) return courses[0];

    const { coursesData } = await import("@/app/data/coursesData");
    return coursesData.find((c: any) => c.id === id);
  } catch (error: any) {
    console.warn("Failed to fetch course from D1 database:", error.message);
    const { coursesData } = await import("@/app/data/coursesData");
    return coursesData.find((c: any) => c.id === id);
  }
}

export async function findSimilarCourses(currentId: number, limit = 2) {
  const courses = await getCoursesFromR2();
  return courses.filter((c: any) => c.id !== currentId).slice(0, limit);
}

/**
 * Fetches all articles directly from D1 SQLite Database table 'articles'.
 */
export async function getArticlesFromR2() {
  try {
    const articles = await queryD1(`
      SELECT id, title, description, content, author, date, category, read_time as readTime, image
      FROM articles ORDER BY id ASC
    `);
    if (articles && articles.length > 0) return articles;

    const { articles: localArticles } = await import("@/app/data/articles");
    return localArticles;
  } catch (error: any) {
    console.warn("Failed to fetch articles from D1 database:", error.message);
    const { articles: localArticles } = await import("@/app/data/articles");
    return localArticles;
  }
}

/**
 * Finds an article by ID directly from D1 SQLite Database table 'articles'.
 */
export async function findArticleById(id: number) {
  try {
    const articles = await queryD1(`
      SELECT id, title, description, content, author, date, category, read_time as readTime, image
      FROM articles WHERE id = ?
    `, [id]);
    if (articles && articles.length > 0) return articles[0];

    const { getArticleById } = await import("@/app/data/articles");
    return getArticleById(id);
  } catch (error: any) {
    console.warn("Failed to fetch article from D1 database:", error.message);
    const { getArticleById } = await import("@/app/data/articles");
    return getArticleById(id);
  }
}

/**
 * Finds user by email directly from D1 SQLite Database table 'users'.
 */
export async function findUserByEmail(email: string) {
  if (!email) return null;
  const cleanEmail = email.toLowerCase().trim();
  try {
    const users = await queryD1(`
      SELECT email, first_name as firstName, last_name as lastName, password, role, created_at as createdAt
      FROM users WHERE LOWER(email) = ?
    `, [cleanEmail]);
    if (users && users.length > 0) return users[0];
    return null;
  } catch (error: any) {
    console.warn("Failed to fetch user from D1 database:", error.message);
    return null;
  }
}

/**
 * Creates user directly into D1 SQLite Database table 'users'. No R2 calls.
 */
export async function createUser(email: string, userData: any) {
  const cleanEmail = email.toLowerCase().trim();
  const createdAt = userData.createdAt || new Date().toISOString();

  const success = await executeD1(
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

  if (!success) {
    throw new Error("Failed to save user into D1 database");
  }
  return true;
}

/**
 * Gets all users directly from D1 SQLite Database table 'users'.
 */
export async function getAllUsers() {
  try {
    const users = await queryD1(`
      SELECT email, first_name as firstName, last_name as lastName, role, created_at as createdAt
      FROM users ORDER BY created_at DESC
    `);
    return users || [];
  } catch (error) {
    console.warn("Error listing users from D1 database:", error);
    return [];
  }
}