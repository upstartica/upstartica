import { NextResponse } from 'next/server';
import { uploadToR2 } from '@/lib/r2';
import { articles as articlesData } from '@/app/data/articles';

export async function POST() {
    try {
        console.log('Force seeding R2 from local articles data...');
        
        // Seed the main list
        const mainKey = 'data/articles.json';
        await uploadToR2(mainKey, JSON.stringify(articlesData), 'application/json');
        
        // Seed individual article objects
        for (const article of articlesData) {
            const key = `data/articles/${article.id}.json`;
            await uploadToR2(key, JSON.stringify(article), 'application/json');
        }
        
        return NextResponse.json({ success: true, message: "Articles seeded successfully along with individual files", count: articlesData.length });
    } catch (error: any) {
        console.error("R2 Error SEED:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
