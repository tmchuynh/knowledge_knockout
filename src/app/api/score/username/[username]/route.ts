import { Score } from '@/backend/models';
import { NextResponse } from 'next/server';

export async function GET( request: Request,
    props: { params: { username: string; }; }
) {
    const params = await props.params;
    try {
        const { username } = params;

        if ( !username ) {
            return NextResponse.json( { error: 'Username query parameter is required.' }, { status: 400 } );
        }

        const scores = await Score.findAll( {
            where: { username }
        } );

        return NextResponse.json( scores, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching scores:', error );
        return NextResponse.json( { error: 'An internal server error occurred while fetching scores.' }, { status: 500 } );
    }
}
