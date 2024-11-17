'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/backend/models';

const ResultPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [score, setScore] = useState<number>( 0 );
    const [quiz, setQuiz] = useState<Quiz>();
    const [totalQuestions, setTotalQuestions] = useState<number>( 0 );
    const [loading, setLoading] = useState( true );
    const [error, setError] = useState<string | null>( null );

    useEffect( () => {
        const fetchScoreAndQuiz = async () => {
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

                setScore( data.score );

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
            } catch ( error ) {
                console.error( 'Error fetching score:', error );
                setError( 'An error occurred while fetching data.' );
            } finally {
                setLoading( false );
            }
        };

        fetchScoreAndQuiz();
    }, [] );

    if ( loading ) {
        return <p className="text-center">Loading...</p>;
    }

    if ( error ) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="flex flex-col justify-center items-center px-6 py-10 lg:px-8 container border-4 border-gray-200 dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full lg:w-11/12 shadow-lg">
            <h1 className="text-4xl font-extrabold text-stone text-center mb-5">Quiz Completed!</h1>
            <h3 className="text-center text-xl font-extrabold dark:text-white">Your Score:</h3>
            <h6 className="text-center text-lg pb-4 font-bold dark:text-white">
                {score} out of {quiz?.total_questions}
            </h6>
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
