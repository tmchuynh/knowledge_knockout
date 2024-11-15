import { Score } from '@/backend/models';
import { NextResponse } from 'next/server';

export async function GET( request: Request ) {
    try {

        const url = new URL( request.url );
        const username = url.searchParams.get( 'username' );

        if ( !username ) {
            return NextResponse.json( { error: 'Username query parameter is required.' }, { status: 400 } );
        }

        const scores = await Score.findAll( {
            where: {
                username: username
            }
        } );

        if ( !scores || scores.length === 0 ) {
            return NextResponse.json( { error: 'There are no scores in the database for this user.' }, { status: 404 } );
        }

        return NextResponse.json( scores );
    } catch ( error ) {
        console.error( 'Error fetching scores:', error );
        return NextResponse.json( { error: 'Failed to fetch scores.' }, { status: 500 } );
    }
}
