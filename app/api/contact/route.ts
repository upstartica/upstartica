import { NextResponse } from 'next/server';
import { executeD1 } from '@/lib/d1';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const chars = '0123456789';
        let tokenId = '';
        for (let i = 0; i < 10; i++) {
            tokenId += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        const submittedAt = new Date().toISOString();

        // Save directly into D1 SQLite Database table contact_submissions
        await executeD1(
            `INSERT INTO contact_submissions (id, name, email, subject, message, submitted_at) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                tokenId,
                data.name || '',
                data.email || '',
                data.subject || '',
                data.message || '',
                submittedAt,
            ]
        );

        return NextResponse.json({ success: true, tokenId });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
