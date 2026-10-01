import { NextResponse } from 'next/server';
import { queryD1, executeD1 } from '@/lib/d1';

// GET all courses from D1 database
export async function GET() {
    try {
        const courses = await queryD1(`
            SELECT id, title, category, image, hours, author, description,
                   full_description as fullDescription, students, rating, stars, price
            FROM courses ORDER BY id ASC
        `);
        return NextResponse.json(courses);
    } catch (error: any) {
        console.error("D1 GET Courses Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST create course in D1 database
export async function POST(request: Request) {
    try {
        const newCourse = await request.json();

        // Get max id
        const maxIdRes = await queryD1<{ maxId: number }>(`SELECT MAX(id) as maxId FROM courses`);
        const newId = (maxIdRes[0]?.maxId || 0) + 1;
        newCourse.id = newId;

        await executeD1(
            `INSERT INTO courses (id, title, category, image, hours, author, description, full_description, students, rating, stars, price)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                newId,
                newCourse.title || '',
                newCourse.category || '',
                newCourse.image || '',
                newCourse.hours || 0,
                newCourse.author || '',
                newCourse.description || '',
                newCourse.fullDescription || '',
                newCourse.students || 0,
                newCourse.rating || 5,
                newCourse.stars || 5,
                newCourse.price || 0,
            ]
        );

        return NextResponse.json(newCourse, { status: 201 });
    } catch (error: any) {
        console.error("D1 POST Course Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
