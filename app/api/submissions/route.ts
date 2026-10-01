import { NextRequest, NextResponse } from 'next/server';
import { queryD1, executeD1 } from '@/lib/d1';

// GET all task submissions from D1
export async function GET() {
    try {
        const rows = await queryD1(`
            SELECT id, task_id as taskId, task_title as taskTitle, learner_name as learnerName,
                   description, attachment_name as attachmentName, status, submitted_at as submittedAt
            FROM task_submissions ORDER BY submitted_at DESC
        `);
        return NextResponse.json(rows);
    } catch (error) {
        console.error('GET /api/submissions - Error:', error);
        return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
    }
}

// POST create task submission in D1
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const id = Date.now().toString();
        const submittedAt = new Date().toISOString();

        const newSubmission = {
            id,
            taskId: body.taskId || '',
            taskTitle: body.taskTitle || '',
            learnerName: body.learnerName || '',
            description: body.description || '',
            attachmentName: body.attachmentName || '',
            status: 'submitted',
            submittedAt
        };

        await executeD1(
            `INSERT INTO task_submissions (id, task_id, task_title, learner_name, description, attachment_name, status, submitted_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id,
                newSubmission.taskId,
                newSubmission.taskTitle,
                newSubmission.learnerName,
                newSubmission.description,
                newSubmission.attachmentName,
                newSubmission.status,
                submittedAt
            ]
        );

        return NextResponse.json(newSubmission, { status: 201 });
    } catch (error) {
        console.error('POST /api/submissions - Error:', error);
        return NextResponse.json({ error: 'Failed to create submission' }, { status: 500 });
    }
}
