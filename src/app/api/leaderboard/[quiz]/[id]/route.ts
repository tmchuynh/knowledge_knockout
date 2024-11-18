import { NextResponse } from 'next/server';
import { Quiz, Score } from '@/backend/models';
import { formatDate, formatTimeString } from '@/utils/formatUtils';

export async function GET(
    request: Request,
    props: { params: { quiz: string, id: string; }; }
) {
    try {
        const { quiz, id } = await props.params;

        console.log( id, quiz );
        const decodedTitle = decodeURIComponent( quiz );

        if ( !decodedTitle ) {
            console.log( 'Decoded title not found' );
            return NextResponse.json( { error: 'Quiz title is required' }, { status: 400 } );
        }

        // Fetch scores by quiz ID
        const scores = await Score.findAll( {
            where: { quiz_id: id },
            include: [
                {
                    model: Quiz,
                    as: 'quiz',
                }
            ]
        } );

        console.log( "SCORES", scores );

        if ( scores.length === 0 ) {
            console.log( 'No scores found for this quiz' );
            return NextResponse.json( { message: 'No scores found for this quiz' }, { status: 404 } );
        }

        // Create leaderboard data with calculated score percentages
        const leaderboardData = scores.map( ( score ) => ( {
            quiz_subject: score.quiz.subject,
            timelapsed: formatTimeString( score.timelapsed ),
            quiz_id: score.quiz_id,
            username: score.username,
            level: score.quiz.level,
            score: ( score.score! / score.quiz.total_questions! ) * 100,
            date: formatDate( score.updated_at! ),
        } ) );

        console.log( 'Leaderboard data', leaderboardData );

        return NextResponse.json( leaderboardData, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching leaderboard data:', error );
        return NextResponse.json( { error: 'Internal server error' }, { status: 500 } );
    }
}
