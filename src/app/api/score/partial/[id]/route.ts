import { Score } from '@/backend/models';
import { NextRequest, NextResponse } from 'next/server';
import { Op } from 'sequelize';

// Handler for GET request to find a score by partial ID
export async function GET( req: NextRequest ) {
    try {
        // Extract the partial ID from query parameters
        const { searchParams } = new URL( req.url );
        const partialId = searchParams.get( 'partialId' );

        if ( !partialId ) {
            return NextResponse.json( { message: 'Partial ID is required' }, { status: 400 } );
        }

        // Find the score entry by partial ID using the LIKE operator
        const score = await Score.findOne( {
            where: {
                id: {
                    [Op.like]: `%${ partialId }%`
                },
                completed: false
            }
        } );

        if ( score ) {
            return NextResponse.json( score, { status: 200 } );
        } else {
            return NextResponse.json( { message: 'Score not found' }, { status: 404 } );
        }
    } catch ( error ) {
        console.error( 'Error finding score by partial ID:', error );
        return NextResponse.json( { message: 'Internal server error' }, { status: 500 } );
    }
}
