import { NextResponse } from 'next/server';
import { Score, User } from '../../../backend/models';

export async function GET( _request: Request ) {
    try {
        const scores = await Score.findAll();

        if ( scores.length === 0 ) {
            return NextResponse.json( { error: 'There are no scores in the database.' }, { status: 404 } );
        }

        return NextResponse.json( scores );
    } catch ( error ) {
        console.error( 'Error fetching score:', error );
        return NextResponse.json( { error: 'Failed to fetch scores.' }, { status: 500 } );
    }
}


export async function POST( request: Request ) {
    try {
        const { username, quiz_id, score, level } = await request.json();

        const existingScore = await Score.findOne( {
            where: { quiz_id, username },
        } );

        if ( existingScore ) {
            return NextResponse.json( { existingScore }, { status: 200 } );
        } else {
            const user = await User.findOne( { where: { username } } );

            if ( !user ) {
                return NextResponse.json( { error: 'User not found.' }, { status: 404 } );
            }

            const scoreId = `score-${ user.id }-${ quiz_id }-${ level }`;
            const newScore = await Score.create( {
                id: scoreId,
                quiz_id,
                username,
                score,
                quiz_date: new Date(),
                created_at: new Date(),
                updated_at: new Date(),
            } );

            return NextResponse.json( { newScore }, { status: 201 } );
        }
    } catch ( error ) {
        console.error( 'Error creating score:', error );
        return NextResponse.json( { error: 'Failed to create score.' }, { status: 500 } );
    }
}


export async function PUT( request: Request ) {
    try {
        const { score_id, increment } = await request.json();

        if ( typeof increment !== 'number' ) {
            return NextResponse.json( { error: 'Invalid increment value.' }, { status: 400 } );
        }

        const score = await Score.findByPk( score_id );
        if ( !score ) {
            return NextResponse.json( { error: 'Score not found.' }, { status: 404 } );
        }

        score.score += increment;
        score.updated_at = new Date();
        await score.save();

        return NextResponse.json( score, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error updating score:', error );
        return NextResponse.json( { error: 'Failed to update score.' }, { status: 500 } );
    }
}

