import { NextRequest, NextResponse } from 'next/server';
import { queryD1, executeD1 } from '@/lib/d1';

// GET all tasks from D1
export async function GET() {
    try {
        const tasks = await queryD1(`
            SELECT id, title, description, course, assign_to as assignTo, assign_type as assignType,
                   deadline, due_date as dueDate, points, status, created_at as createdAt, updated_at as updatedAt
            FROM tasks ORDER BY created_at DESC
        `);
        return NextResponse.json(tasks);
    } catch (error) {
        console.error('GET /api/tasks - Error:', error);
        return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }
}

// POST create new task in D1
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const id = Date.now().toString();
        const createdAt = new Date().toISOString();

        const newTask = {
            id,
            title: body.title || '',
            description: body.description || '',
            course: body.course || '',
            assignTo: body.assignTo || body.assign_to || '',
            assignType: body.assignType || body.assign_type || '',
            deadline: body.deadline || '',
            dueDate: body.dueDate || body.due_date || '',
            points: body.points || 0,
            status: 'active',
            createdAt,
            updatedAt: createdAt
        };

        await executeD1(
            `INSERT INTO tasks (id, title, description, course, assign_to, assign_type, deadline, due_date, points, status, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id,
                newTask.title,
                newTask.description,
                newTask.course,
                newTask.assignTo,
                newTask.assignType,
                newTask.deadline,
                newTask.dueDate,
                newTask.points,
                newTask.status,
                createdAt,
                createdAt
            ]
        );

        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        console.error('POST /api/tasks - Error:', error);
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}

// PUT update task in D1
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body.id) {
            return NextResponse.json({ error: 'Task ID required' }, { status: 400 });
        }

        const updatedAt = new Date().toISOString();
        await executeD1(
            `UPDATE tasks SET title = ?, description = ?, course = ?, assign_to = ?, assign_type = ?,
             deadline = ?, due_date = ?, points = ?, status = ?, updated_at = ?
             WHERE id = ?`,
            [
                body.title,
                body.description,
                body.course,
                body.assignTo || body.assign_to,
                body.assignType || body.assign_type,
                body.deadline,
                body.dueDate || body.due_date,
                body.points || 0,
                body.status || 'active',
                updatedAt,
                body.id
            ]
        );

        return NextResponse.json({ ...body, updatedAt });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }
}

// DELETE task from D1
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const taskId = searchParams.get('id');

        if (!taskId) {
            return NextResponse.json({ error: 'Task ID required' }, { status: 400 });
        }

        await executeD1(`DELETE FROM tasks WHERE id = ?`, [taskId]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
}
