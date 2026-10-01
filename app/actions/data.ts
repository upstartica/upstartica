'use server';

import { queryD1, executeD1 } from '@/lib/d1';

async function fetchKvFromD1(key: string, fallbackData: any = null) {
    try {
        const rows = await queryD1<{ value: string }>(
            `SELECT value FROM kv_store WHERE key = ?`,
            [key]
        );
        if (rows.length > 0 && rows[0].value) {
            return JSON.parse(rows[0].value);
        }
    } catch (e: any) {
        console.warn(`D1 KV fetch warning for ${key}:`, e.message);
    }
    return fallbackData;
}

async function saveKvToD1(key: string, data: any) {
    const jsonStr = JSON.stringify(data);
    const updatedAt = new Date().toISOString();
    return await executeD1(
        `INSERT OR REPLACE INTO kv_store (key, value, updated_at) VALUES (?, ?, ?)`,
        [key, jsonStr, updatedAt]
    );
}

export async function getDashboardData() {
    return await fetchKvFromD1('learner/dashboard.json', {
        featuredCourses: [],
        continueWatching: [],
        mentors: []
    });
}

export async function getTasksData() {
    try {
        const tasks = await queryD1(`
            SELECT id, title, description, course, assign_to as assignTo, assign_type as assignType,
                   deadline, due_date as dueDate, points, status, created_at as createdAt
            FROM tasks ORDER BY created_at DESC
        `);
        return tasks.length > 0 ? tasks : await fetchKvFromD1('mentor/tasks.json', []);
    } catch {
        return [];
    }
}

export async function getSubmissionsData() {
    try {
        const submissions = await queryD1(`
            SELECT id, task_id as taskId, task_title as taskTitle, learner_name as learnerName,
                   description, attachment_name as attachmentName, status, submitted_at as submittedAt
            FROM task_submissions ORDER BY submitted_at DESC
        `);
        return submissions.length > 0 ? submissions : await fetchKvFromD1('mentor/submissions.json', []);
    } catch {
        return [];
    }
}

export async function getCommunityData() {
    return await fetchKvFromD1('learner/community.json', {
        posts: [],
        myCommunities: [],
        discoverCommunities: []
    });
}

export async function getResourcesData() {
    return await fetchKvFromD1('learner/resources.json', {
        courseMaterials: [],
        studyGuides: [],
        lectureNotes: []
    });
}

export async function saveResourcesData(data: any) {
    return await saveKvToD1('learner/resources.json', data);
}

export async function getMeetingsData() {
    try {
        const meetings = await queryD1(`
            SELECT id, title, scheduled_date as scheduledDate, scheduled_time as scheduledTime,
                   attendees, meet_code as meetCode, password
            FROM meetings ORDER BY id ASC
        `);
        return meetings.length > 0 ? meetings : await fetchKvFromD1('learner/meetings.json', []);
    } catch {
        return [];
    }
}

export async function getArticlesData() {
    try {
        const articles = await queryD1(`
            SELECT id, title, description, content, author, date, category, read_time as readTime, image
            FROM articles ORDER BY id ASC
        `);
        return articles.length > 0 ? articles : await fetchKvFromD1('Public/articles.json', []);
    } catch {
        return [];
    }
}

export async function getRegisteredUsers() {
    try {
        const users = await queryD1(`
            SELECT email, first_name as firstName, last_name as lastName, role, created_at as createdAt
            FROM users ORDER BY created_at DESC
        `);
        return users;
    } catch {
        return [];
    }
}
