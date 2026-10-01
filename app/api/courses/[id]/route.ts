import { NextResponse } from 'next/server';
import { queryD1, executeD1 } from '@/lib/d1';

// GET course by ID from D1 database
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const courseId = parseInt(id);

        const courses = await queryD1(`
            SELECT id, title, category, image, hours, author, description,
                   full_description as fullDescription, students, rating, stars, price
            FROM courses WHERE id = ?
        `, [courseId]);

        if (courses.length === 0) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        return NextResponse.json(courses[0]);
    } catch (error: any) {
        console.error("D1 GET Course Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT update course in D1 database
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const courseId = parseInt(id);
        const body = await request.json();

        await executeD1(
            `UPDATE courses SET title = ?, category = ?, image = ?, hours = ?, author = ?,
                    description = ?, full_description = ?, students = ?, rating = ?, stars = ?, price = ?
             WHERE id = ?`,
            [
                body.title,
                body.category,
                body.image,
                body.hours,
                body.author,
                body.description,
                body.fullDescription,
                body.students,
                body.rating,
                body.stars,
                body.price,
                courseId
            ]
        );

        return NextResponse.json({ ...body, id: courseId });
    } catch (error: any) {
        console.error("D1 PUT Course Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE course from D1 database
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const courseId = parseInt(id);

        await executeD1(`DELETE FROM courses WHERE id = ?`, [courseId]);
        return NextResponse.json({ success: true, message: `Course ${courseId} deleted` });
    } catch (error: any) {
        console.error("D1 DELETE Course Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
