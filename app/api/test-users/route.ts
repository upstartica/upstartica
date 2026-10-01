import { NextResponse } from 'next/server';
import { getRegisteredUsers } from '@/app/actions/data';

export async function GET() {
    const users = await getRegisteredUsers();
    return NextResponse.json({ users });
}
