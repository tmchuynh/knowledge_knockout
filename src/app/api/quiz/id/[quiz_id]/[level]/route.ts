import { Answer, Question } from '@/backend/associations';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    props: { params: { quiz_id: string; level: number; }; }
) {
    const { quiz_id, level } = await props.params;

    try {
        const questions = await Question.findAll( {
            where: {
                quiz_id: quiz_id,
            },
            include: [{ model: Answer, as: 'answers' }],
        } );

        console.log( "all the questions", questions );

        if ( questions.length === 0 ) {
            console.log( 'No questions found' );
            return NextResponse.json( { error: 'No questions found for this quiz' }, { status: 404 } );
        }

        return NextResponse.json( { questions }, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching questions:', error );
        return NextResponse.json( { error: 'Failed to fetch questions.' }, { status: 500 } );
    }
}
