import { Quiz } from '@/src/backend/models';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { title: string; }; }
) {
    const title = decodeURIComponent( params.title );

    if ( !title ) {
        return NextResponse.json( { error: 'Quiz title is required' }, { status: 400 } );
    }

    try {
        const quiz = await Quiz.findAll( {
            where: { name: title },
        } );

        if ( !quiz ) {
            return NextResponse.json( { error: 'Quiz not found' }, { status: 404 } );
        }

        console.log( 'Fetched quiz details:', quiz );

        return NextResponse.json( quiz );

    } catch ( error ) {
        console.error( 'Error fetching quiz details:', error );
        return NextResponse.json( { error: 'Internal Server Error' }, { status: 500 } );
    }
}