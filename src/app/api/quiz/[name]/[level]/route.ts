import { Answer, Question } from '@/backend/models'; // Ensure this path matches your project structure
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { title: string; level: number; id: number; }; }
) {
    const { id } = params;

    if ( !id ) {
        return NextResponse.json( { error: 'Quiz ID is required' }, { status: 400 } );
    }

    try {
        const questions = await Question.findAll( {
            where: {
                quiz_id: id,
            },
            include: [{ model: Answer, as: 'answers' }],
        } );

        if ( questions.length === 0 ) {
            return NextResponse.json( { error: 'No questions found for this quiz' }, { status: 404 } );
        }

        return NextResponse.json( { questions }, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching questions:', error );
        return NextResponse.json( { error: 'Failed to fetch questions.' }, { status: 500 } );
    }
}
