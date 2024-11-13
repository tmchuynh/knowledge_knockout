import { NextResponse } from 'next/server';
import { Quiz, Score } from '@/backend/models';

export async function GET(
    request: Request,
    props: { params: Promise<{ title: string; }>; }
) {
    const params = await props.params;
    try {
        const { searchParams } = new URL( request.url );
        const quizId = searchParams.get( 'id' );
        console.log( 'Received quiz ID:', quizId );
        const title = decodeURIComponent( params.title );
        console.log( 'Received quizName:', params.title );

        if ( !title ) {
            return NextResponse.json( { error: 'Quiz name is required' }, { status: 400 } );
        }

        const quiz = await Quiz.findOne( {
            where: { subject: title },
            attributes: ['id'],
        } );

        const questions = quiz?.total_questions;

        console.log( 'Quiz found:', quiz );

        const scores = await Score.findAll( {
            where: {
                quiz_id: quizId!,
            },
        } );

        console.log( 'Scores fetched:', scores );

        const leaderboardData = scores.map( ( score ) => ( {
            quiz_id: quizId,
            score: ( score.score! / questions! ) * 100,
            date: score.quiz_date,
        } ) );

        console.log( 'leaderboardData:', leaderboardData );


        return NextResponse.json( scores );
    } catch ( error ) {
        console.error( 'Error fetching leaderboard data:', error );
        return NextResponse.json( { error: 'Internal server error' }, { status: 500 } );
    }
}
