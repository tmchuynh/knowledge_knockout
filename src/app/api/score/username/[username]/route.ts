import { Score } from '@/backend/models';
import { NextResponse } from 'next/server';

export async function GET( request: Request ) {
    try {
        const { searchParams } = new URL( request.url );
        const username = searchParams.get( 'username' );

        if ( !username ) {
            return NextResponse.json( { error: 'Username query parameter is required.' }, { status: 400 } );
        }

        const scores = await Score.findAll( {
            where: { username }
        } );

        if ( scores.length === 0 ) {
            return NextResponse.json( { error: 'No scores found for this user.' }, { status: 404 } );
        }

        return NextResponse.json( scores, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching scores:', error );
        return NextResponse.json( { error: 'An internal server error occurred while fetching scores.' }, { status: 500 } );
    }
}
