import { NextResponse } from 'next/server';
import { Score, User } from '../../../backend/models';

export async function GET( _request: Request ) {
    try {
        const score = await Score.findAll();

        if ( !score ) {
            return NextResponse.json( { error: 'There are no scores in the database.' }, { status: 404 } );
        }

        return NextResponse.json( score );
    } catch ( error ) {
        console.error( 'Error fetching score:', error );
        return NextResponse.json( { error: 'Failed to fetch score.' }, { status: 500 } );
    }
}


export async function POST( request: Request ) {
    try {
        const { username, quiz_id, score, level } = await request.json();

        const existingScore = await Score.findOne( {
            where: { quiz_id, username },
        } );

        if ( existingScore ) {
            return NextResponse.json( { existingScore } );
        } else {
            const user = await User.findOne( { where: { username } } );

            const scoreId = `score-${ user!.id }-${ quiz_id }-${ level }`;
            const newScore = await Score.create( {
                id: scoreId,
                quiz_id,
                username,
                score,
                quiz_date: new Date(),
                created_at: new Date(),
                updated_at: new Date(),
            } );

            return NextResponse.json( { newScore } );
        }
    } catch ( error ) {
        console.error( 'Error initializing score:', error );
        return NextResponse.json( { error } );
    }
}


export async function PUT( request: Request ) {
    try {
        const { score_id, increment } = await request.json();

        const score = await Score.findByPk( score_id );
        if ( !score ) {
            return NextResponse.json( { error: 'Score not found.' }, { status: 404 } );
        }

        score.score += increment;
        await score.save();

        return NextResponse.json( score );
    } catch ( error ) {
        console.error( 'Error updating score:', error );
        return NextResponse.json( { error: 'Failed to update score.' }, { status: 500 } );
    }
}
