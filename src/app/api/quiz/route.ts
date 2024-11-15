import { Quiz } from '@/backend/models';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const quizzes = await Quiz.findAll();

        if ( !quizzes || quizzes.length === 0 ) {
            return NextResponse.json( { message: 'No quizzes found' }, { status: 404 } );
        }

        return NextResponse.json( quizzes, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching quizzes:', error );
        return NextResponse.json( { error: 'Failed to fetch quiz data' }, { status: 500 } );
    }
}
