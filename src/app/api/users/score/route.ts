import { NextResponse } from 'next/server';
import { Score } from '../../../../backend/models';

export async function GET( request: Request ) {
    try {
        const score = await Score.findAll();

        if ( !score ) {
            return NextResponse.json( { error: 'Score not found.' }, { status: 404 } );
        }

        return NextResponse.json( score );
    } catch ( error ) {
        console.error( 'Error fetching score:', error );
        return NextResponse.json( { error: 'Failed to fetch score.' }, { status: 500 } );
    }
}


export async function POST( request: Request ) {
    try {
        const { user_id, quiz_id, total_questions, score, level } = await request.json();

        const existingScore = await Score.findOne( {
            where: { quiz_id, level },
        } );

        if ( existingScore ) {
            return NextResponse.json( { existingScore } );
        } else {
            const scoreId = `score-${ user_id }-${ quiz_id }-${ level }`;
            const newScore = await Score.create( {
                id: scoreId,
                quiz_id,
                total_questions,
                level,
                score,
                created_at: new Date(),
                updated_at: new Date(),
                quiz_date: new Date(),
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
