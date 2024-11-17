import { NextResponse } from 'next/server';
import Quiz from '@/backend/models/Quiz';

export async function GET( request: Request, { params }: { params: { quiz_id: string; }; } ) {
    try {
        const { quiz_id } = await params;

        if ( !quiz_id ) {
            return NextResponse.json( { error: 'Quiz ID is required.' }, { status: 400 } );
        }

        // Find the quiz by ID
        const quiz = await Quiz.findOne( { where: { id: quiz_id } } );

        if ( !quiz ) {
            return NextResponse.json( { error: 'Quiz not found.' }, { status: 404 } );
        }

        // Return the subject of the quiz
        return NextResponse.json( quiz, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching quiz subject:', error );
        return NextResponse.json( { error: 'Failed to retrieve quiz subject.' }, { status: 500 } );
    }
}
