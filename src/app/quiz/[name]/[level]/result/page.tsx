'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Quiz, Score } from '@/backend/models';
import { formatTimeString } from '@/utils/formatUtils';

const ResultPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [score, setScore] = useState<number>( 0 );
    const [timelapsed, setTimelapsed] = useState<string>( '' );
    const [quiz, setQuiz] = useState<Quiz>();
    const [loading, setLoading] = useState( true );
    const [error, setError] = useState<string | null>( null );

    useEffect( () => {
        const fetchScore = async () => {
            const scoreId = searchParams.get( 'scoreId' );

            if ( !scoreId ) {
                setError( 'Score ID is missing.' );
                setLoading( false );
                return;
            }

            try {
                // Fetch the score data
                const res = await fetch( `/api/score/${ scoreId }`, {
                    credentials: 'include',
                } );

                if ( !res.ok ) {
                    throw new Error( 'Failed to fetch score data.' );
                }

                const data = await res.json();

                console.log( "scoreData", data );

                setScore( data.score );
                setTimelapsed( data.timelapsed );
                fetchQuizData( data );
                updateCompletedScore( data );
            } catch ( error ) {
                console.error( 'Error fetching score:', error );
                setError( 'An error occurred while fetching data.' );
            } finally {
                setLoading( false );
            }
        };

        const updateCompletedScore = async ( data: Score ) => {
            const response = await fetch( `/api/score/${ data.id }`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { id: data.id, completed: true } ),
            } );

            if ( !response.ok ) {
                throw new Error( 'Failed to update completed status.' );
            }
        };

        const fetchQuizData = async ( data: Score ) => {
            try {
                // Fetch the quiz data based on the quiz ID
                const resQ = await fetch( `/api/quiz/id/${ data.quiz_id }`, {
                    credentials: 'include',
                } );

                if ( !resQ.ok ) {
                    throw new Error( 'Failed to fetch quiz data.' );
                }

                const dataQ = await resQ.json();

                setQuiz( dataQ );

            } catch ( error ) {
                console.error( 'Error fetching quiz:', error );
                throw new Error( 'Failed to fetch quiz data' );
            }
        };

        fetchScore();
    }, [] );

    if ( loading ) {
        return <p className="text-center">Loading...</p>;
    }

    if ( error ) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="flex flex-col justify-center items-center px-6 py-10 lg:px-8 container border-4 border-gray-200 dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full lg:w-11/12 shadow-lg">
            <h1 className="text-center">Quiz Completed!</h1>
            <h3 className="text-center">Your Score:</h3>
            <h6 className="text-center">
                {score} out of {quiz?.total_questions}
            </h6>
            <h5>
                Time taken: {formatTimeString( timelapsed )}
            </h5>
            <Button
                className="mt-4"
                onClick={() => router.push( '/quiz' )}
            >
                Return to Home
            </Button>
        </div>
    );
};

export default ResultPage;
