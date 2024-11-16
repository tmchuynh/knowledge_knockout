import { Answer } from '@/backend/models'; // Make sure this path is correct
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string; }; }
) {
    const { id } = params;

    if ( !id ) {
        return NextResponse.json( { error: 'Question ID is required' }, { status: 400 } );
    }

    try {
        const answers = await Answer.findAll( {
            where: { question_id: id },
        } );

        if ( answers.length === 0 ) {
            return NextResponse.json( { error: 'No answers found for this question' }, { status: 404 } );
        }

        return NextResponse.json( { answers }, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching answers:', error );
        return NextResponse.json( { error: 'Failed to fetch answers.' }, { status: 500 } );
    }
}
