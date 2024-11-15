import { Answer } from '@/src/backend/models';
import { NextResponse } from 'next/server';

export async function GET( request: Request, props: { params: Promise<{ id: string; }>; } ) {
    const params = await props.params;
    try {
        const { id } = params;
        const answers = await Answer.findAll( {
            where: { question_id: id },
        } );
        return NextResponse.json( { answers } );
    } catch ( error ) {
        console.error( 'Error fetching answers:', error );
        return NextResponse.json( { error: 'Failed to fetch answers.' }, { status: 500 } );
    }
}