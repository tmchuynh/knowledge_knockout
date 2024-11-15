import { Quiz } from '@/src/backend/models';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const quizzes = await Quiz.findAll();
        return NextResponse.json( quizzes );
    } catch ( error ) {
        return NextResponse.json( { error: 'Failed to fetch quiz data' }, { status: 500 } );
    }
}