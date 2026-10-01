import { NextResponse } from 'next/server';
import { executeD1 } from '@/lib/d1';
import { coursesData } from '@/app/data/coursesData';

export async function POST() {
    try {
        console.log('Seeding courses into D1 database...');

        for (const course of coursesData) {
            await executeD1(
                `INSERT OR REPLACE INTO courses (
                    id, title, category, image, hours, author, description,
                    full_description, students, rating, stars, price
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    course.id,
                    course.title,
                    (course as any).category || '',
                    course.image || '',
                    course.hours || 0,
                    course.author || '',
                    course.description || '',
                    (course as any).fullDescription || course.description || '',
                    course.students || 0,
                    course.rating || 5.0,
                    course.stars || 5,
                    course.price || 0
                ]
            );
        }

        return NextResponse.json({
            success: true,
            message: "Courses seeded successfully into D1 database",
            count: coursesData.length
        });
    } catch (error: any) {
        console.error("D1 Course Seed Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
