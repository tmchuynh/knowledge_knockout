'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const ResultPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [score, setScore] = useState<number>( 0 );
    const [totalQuestions, setTotalQuestions] = useState<number>( 0 );

    useEffect( () => {
        const fetchScoreAndQuiz = async () => {
            const scoreId = searchParams.get( 'scoreId' );

            console.log( 'Fetching score with ID:', scoreId );
            if ( !scoreId ) {
                console.error( 'Score ID is missing.' );
                return;
            }

            try {
                // First fetch: Get the score data
                const res = await fetch( `/api/scores/${ scoreId }` );
                const data = await res.json();

                console.log( 'Score data:', data );

                if ( res.ok ) {
                    const scoreData = data[0]; // Adjust if data is not an array
                    setScore( scoreData.score );
                    setTotalQuestions( scoreData.total_questions );
                    // setQuizId( scoreData.quiz_id );

                    console.log( 'Quiz ID:', scoreData.quiz_id );
                    console.log( 'score', scoreData.score );

                    // Second fetch: Get the quiz data using quiz_id from scoreData
                    try {
                        const resQ = await fetch( `/api/quiz/${ scoreData.quiz_id }` );
                        const dataQ = await resQ.json();

                        console.log( 'Quiz data:', dataQ );

                        if ( resQ.ok ) {
                            const quizData = dataQ[0]; // Adjust if dataQ is not an array
                            // You can set additional state here if needed
                        } else {
                            console.error( 'Failed to fetch quiz:', dataQ.error );
                        }
                    } catch ( error ) {
                        console.error( 'Error fetching quiz:', error );
                    }
                } else {
                    console.error( 'Failed to fetch score:', data.error );
                }
            } catch ( error ) {
                console.error( 'Error fetching score:', error );
            }
        };

        fetchScoreAndQuiz();
    }, [] );

    return (
        <div className="flex flex-col min-h-full justify-center items-center px-6 py-10 lg:px-8 container border-4 border-gray-200 dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full lg:w-11/12">
            <h1 className="text-center text-2xl pb-5 font-extrabold dark:text-white">Quiz Completed!</h1>
            <h3 className="text-center text-xl font-extrabold dark:text-white">Your Score:</h3>
            <h6 className="text-center text-l pb-4 font-bold dark:text-white">
                {score} out of {totalQuestions}
            </h6>
            <button
                className="button text-white mx-3 flex-end bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center"
                onClick={() => router.push( '/quiz' )}
            >
                Return to Home
            </button>
        </div>
    );
};

export default ResultPage;