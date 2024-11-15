import { User } from '@//backend/models';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const quizzes = await User.findAll( { group: "image" } );
        return NextResponse.json( quizzes );
    } catch ( error ) {
        return NextResponse.json( { error: 'Failed to fetch users data' }, { status: 500 } );
    }
}