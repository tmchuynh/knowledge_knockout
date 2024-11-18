import { NextResponse } from 'next/server';
import { Quiz, Score } from '@/backend/models';
import { formatDate, formatPercentage, formatTimeString } from '@/utils/formatUtils';

export async function GET(
    request: Request,
    props: { params: { quiz: string; }; }
) {
    try {
        const { quiz } = await props.params;

        console.log( quiz );
        const decodedTitle = decodeURIComponent( quiz );

        if ( !decodedTitle ) {
            console.log( 'Decoded title not found' );
            return NextResponse.json( { error: 'Quiz title is required' }, { status: 400 } );
        }

        // Fetch scores by quiz ID
        const quizzes = await Quiz.findAll( {
            where: { subject: quiz },
            include: [
                {
                    model: Score,
                    as: 'score',
                }
            ]
        } );

        console.log( "quizzes", quizzes );

        if ( quizzes.length === 0 ) {
            console.log( 'No scores found for this quiz' );
            return NextResponse.json( { message: 'No scores found for this quiz' }, { status: 404 } );
        }


        // Create leaderboard data with calculated score percentages
        const leaderboardData = quizzes
            .map( ( quiz ) => {
                // Check if there is a score array and it has elements
                if ( quiz.score.length > 0 ) {
                    // Find the score entry with the highest score
                    const highestScore = quiz.score.sort( ( a: { score: number; }, b: { score: number; } ) => b.score - a.score )[0];

                    return {
                        quiz_subject: quiz.subject,
                        timelapsed: formatTimeString( highestScore.timelapsed ),
                        quiz_id: quiz.id,
                        username: highestScore.username,
                        level: quiz.level,
                        score: formatPercentage( highestScore.score / quiz.total_questions ),
                        date: formatDate( highestScore.updated_at! ),
                    };
                } else {
                    return null; // Return null if there is no score
                }
            } )
            .filter( Boolean ) // Filter out any null values from the array
            .sort( ( a, b ) => ( a.level as number ) - ( b.level as number ) ); // Sort by level in ascending order



        console.log( 'Leaderboard data', leaderboardData );

        return NextResponse.json( leaderboardData, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching leaderboard data:', error );
        return NextResponse.json( { error: 'Internal server error' }, { status: 500 } );
    }
}
