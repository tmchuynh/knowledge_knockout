import { NextResponse } from 'next/server';
import { Quiz, Score } from '@/backend/models';

export async function GET(
    request: Request,
    props: { params: { title: string; }; }
) {
    try {
        const { searchParams } = new URL( request.url );
        const quizId = searchParams.get( 'id' );

        console.log( 'Received quiz ID:', quizId );

        const { title } = props.params;
        const decodedTitle = decodeURIComponent( title );
        console.log( 'Received quiz title:', decodedTitle );

        if ( !decodedTitle ) {
            return NextResponse.json( { error: 'Quiz title is required' }, { status: 400 } );
        }

        // Find quiz by title
        const quiz = await Quiz.findOne( {
            where: { subject: decodedTitle },
            attributes: ['id', 'total_questions'],
        } );

        if ( !quiz ) {
            return NextResponse.json( { error: 'Quiz not found' }, { status: 404 } );
        }

        console.log( 'Quiz found:', quiz );

        // Fetch scores by quiz ID
        const scores = await Score.findAll( {
            where: { quiz_id: quizId || quiz.id },
        } );

        console.log( 'Scores fetched:', scores );

        if ( scores.length === 0 ) {
            return NextResponse.json( { message: 'No scores found for this quiz' }, { status: 404 } );
        }

        // Create leaderboard data with calculated score percentages
        const leaderboardData = scores.map( ( score ) => ( {
            quiz_id: quizId || quiz.id,
            score: ( score.score! / quiz.total_questions! ) * 100,
            date: score.quiz_date,
        } ) );

        console.log( 'leaderboardData:', leaderboardData );

        return NextResponse.json( leaderboardData, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching leaderboard data:', error );
        return NextResponse.json( { error: 'Internal server error' }, { status: 500 } );
    }
}
