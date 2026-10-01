import { NextResponse } from 'next/server';
import { executeD1 } from '@/lib/d1';
import { articles as articlesData } from '@/app/data/articles';

export async function POST() {
    try {
        console.log('Seeding articles into D1 database...');

        for (const article of articlesData) {
            await executeD1(
                `INSERT OR REPLACE INTO articles (
                    id, title, description, content, author, date, category, read_time, image, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    article.id,
                    article.title,
                    article.description || '',
                    (article as any).content || article.description || '',
                    article.author || '',
                    (article as any).date || new Date().toISOString(),
                    (article as any).category || '',
                    (article as any).readTime || '',
                    article.image || '',
                    new Date().toISOString()
                ]
            );
        }

        return NextResponse.json({
            success: true,
            message: "Articles seeded successfully into D1 database",
            count: articlesData.length
        });
    } catch (error: any) {
        console.error("D1 Articles Seed Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
