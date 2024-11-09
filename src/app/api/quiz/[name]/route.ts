import { Quiz } from '@/backend/models';
import { NextResponse } from 'next/server';

export async function GET( request: Request ) {
    const { searchParams } = new URL( request.url );
    const title = searchParams.get( 'title' );

    console.log( "Quiz Title:", title );

    if ( !title ) {
        return NextResponse.json( { error: 'Quiz title is required' }, { status: 400 } );
    }

    try {
        // Fetch the quiz by title
        const quiz = await Quiz.findAll( {
            where: { name: title },
        } );

        if ( !quiz ) {
            return NextResponse.json( { error: 'Quiz not found' }, { status: 404 } );
        }

        // Log the fetched quiz details
        console.log( 'Fetched quiz details:', quiz );

        // Return the quiz details
        return NextResponse.json( quiz );
    } catch ( error ) {
        console.error( 'Error fetching quiz details:', error );
        return NextResponse.json( { error: 'Internal Server Error' }, { status: 500 } );
    }
}
