"use client";

import { Quiz, Score, User } from '@/types/interface';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const QuizDifficultyPage: React.FC = () => {
    const pathname = usePathname();
    const segments = pathname.split( '/' ).filter( Boolean );
    const subject = segments.length > 1 ? decodeURIComponent( segments[1] ) : '';

    const router = useRouter();
    const [userScores, setUserScores] = useState<Score[]>( [] );
    const [quizData, setQuizData] = useState<Quiz[]>( [] );
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState( true );
    const [error, setError] = useState<string | null>( null );

    useEffect( () => {

        const fetchUserData = async () => {
            try {
                const response = await fetch( '/api/auth/me', {
                    credentials: 'include',
                } );

                if ( !response.ok ) {
                    throw new Error( 'Failed to fetch user data' );
                }

                const userData = await response.json();
                setUser( userData );
            } catch ( error ) {
                console.error( 'Error fetching user data:', error );
            }
        };

        if ( !subject ) {
            console.error( "Quiz ID is missing." );
            setError( "Quiz ID is missing." );
            setLoading( false );
            return;
        }

        const fetchQuizDetails = async () => {
            try {
                const response = await fetch( `/api/quiz/${ subject }`, {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                } );

                if ( response.ok ) {
                    const data = await response.json();
                    setQuizData( data );
                    setUserScores( data.scores || [] );
                } else {
                    setError( `Failed to fetch quiz details: HTTP status ${ response.status }` );
                    console.error( 'Failed to fetch quiz details:', response.status );
                }
            } catch ( error ) {
                console.error( 'Error fetching quiz details:', error );
                setError( 'Error fetching quiz details' );
            } finally {
                setLoading( false );
            }
        };

        fetchUserData();
        fetchQuizDetails();
    }, [subject] );

    const handleDifficultySelection = ( quiz: Quiz, level: number ) => {
        if ( !quiz.id ) return;
        level++;
        router.push( `/quiz/${ quiz.subject }/${ level }/0` );
    };

    const getHighestScoreForLevel = ( quiz: Quiz, level: number ) => {
        level++;
        return userScores
            .filter( ( score ) => score.quiz_id === quiz.id && level === quiz.level )
            .reduce( ( max, score ) => Math.max( max, score.score ), 0 );
    };

    if ( loading ) {
        return <p className="text-center">Loading...</p>;
    }

    if ( error ) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="flex flex-col justify-center px-4 py-6 md:px-8 lg:px-10 container dark:border-gray-700 dark:bg-gray-800 dark:text-white my-4 p-6 rounded-lg border hover:shadow-md w-11/12 mx-auto lg:w-10/12 shadow-lg">
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
                Select Difficulty Level for <br /> {quizData ? quizData[0].subject : 'Loading...'}
            </h2>
            <div id="difficultyOptions" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3">
                {quizData.map( ( quiz, index ) => (
                    <Button
                        key={`${ quiz.id }__${ index + 1 }`}
                        onClick={() => handleDifficultySelection( quiz, index )}
                        className={`transition-all duration-200`}
                    >
                        Level {index + 1}
                        <div className="text-sm mt-1">
                            {getHighestScoreForLevel( quiz, index ) ? `High Score: ${ getHighestScoreForLevel( quiz, index ) }` : ''}
                        </div>
                    </Button>
                ) )}
            </div>
        </div>
    );
};

export default QuizDifficultyPage;
