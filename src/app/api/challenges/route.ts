import Challenge from '@/backend/models/Challenge';
import { NextRequest, NextResponse } from 'next/server';
import { Op } from 'sequelize';

// Handler for the GET request to fetch challenges
export async function GET( req: NextRequest ) {
    try {
        const challenges = await Challenge.findAll( {
            where: {
                date: {
                    [Op.gte]: new Date( new Date().setFullYear( new Date().getFullYear() - 1 ) ), // Fetch challenges from the past year
                },
            },
            order: [['date', 'ASC']],
        } );

        if ( !challenges.length ) {
            return NextResponse.json( { message: 'No challenges found.' }, { status: 404 } );
        }

        return NextResponse.json( challenges, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching challenges:', error );
        return NextResponse.json( { error: 'An internal server error occurred while fetching challenges.' }, { status: 500 } );
    }
}
