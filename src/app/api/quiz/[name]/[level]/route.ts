import { Answer, Question } from '@//backend/models';
import { NextResponse } from 'next/server';

export async function GET(
    props: { params: Promise<{ title: string, level: number, id: number; }>; }
) {
    const params = await props.params;
    try {
        const { id } = params;
        const questions = await Question.findAll( {
            where: {
                quiz_id: id,
            },
            include: [{ model: Answer, as: 'answers' }],
        } );
        return NextResponse.json( { questions } );
    } catch ( error ) {
        console.error( 'Error fetching questions:', error );
        return NextResponse.json( { error: 'Failed to fetch questions.' }, { status: 500 } );
    }
}