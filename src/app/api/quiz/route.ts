import { NextResponse } from 'next/server';
import { Quiz } from '../../../backend/models/index';

export async function GET() {
    try {
        const quizzes = await Quiz.findAll();

        return NextResponse.json( quizzes );
    } catch ( error ) {
        return NextResponse.json( { error: 'Failed to fetch quiz data' }, { status: 500 } );
    }
}
