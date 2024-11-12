import { NextResponse } from 'next/server';
import { Quiz, Score, User } from '@/backend/models';

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
            where: { name: title },
            attributes: ['id'],
        } );

        console.log( 'Quiz found:', quiz );

        const scores = await Score.findAll( {
            where: {
                quiz_id: quizId!,
            },
        } );

        console.log( 'Scores fetched:', scores );

        const leaderboardData = scores.map( score => ( {
            user_id: score.user_id,
            username: score.user?.username,
            quiz_id: quizId,
            quiz: score.quiz?.name,
            level: score.quiz?.level,
            score: ( score.score! / score.total_questions! ) * 100,
            date: score.quiz_date,
        } ) );

        console.log( 'leaderboardData:', leaderboardData );


        return NextResponse.json( scores );
    } catch ( error ) {
        console.error( 'Error fetching leaderboard data:', error );
        return NextResponse.json( { error: 'Internal server error' }, { status: 500 } );
    }
}
