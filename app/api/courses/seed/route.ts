import { NextResponse } from 'next/server';
import { uploadToR2 } from '@/lib/r2';
import { coursesData } from '@/app/data/coursesData';

export async function POST() {
    try {
        console.log('Force seeding R2 from local data...');
        
        // Seed the main list
        const mainKey = 'data/courses.json';
        await uploadToR2(mainKey, JSON.stringify(coursesData), 'application/json');
        
        // Seed individual course objects
        for (const course of coursesData) {
            const key = `data/courses/${course.id}.json`;
            await uploadToR2(key, JSON.stringify(course), 'application/json');
        }
        
        return NextResponse.json({ success: true, message: "Courses seeded successfully along with individual files", count: coursesData.length });
    } catch (error: any) {
        console.error("R2 Error SEED:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
