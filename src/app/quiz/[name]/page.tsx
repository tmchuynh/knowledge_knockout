"use client";

import { Progress, Score } from '@/types/interface';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface QuizDifficultyPageProps {
    params: {
        slug: string;
    };
}

const QuizDifficultyPage: React.FC<QuizDifficultyPageProps> = ( { params } ) => {
    const { slug: quizId } = params;
    const router = useRouter();
    const [progress, setProgress] = useState<Progress[]>( [] );
    const [userScores, setUserScores] = useState<Score[]>( [] );
    const [quizData, setQuizData] = useState<any>( null );
    const [difficultyLevels, setDifficultyLevels] = useState<number[]>( [] );
    const [loading, setLoading] = useState( true );
    const [error, setError] = useState<string | null>( null );

    useEffect( () => {
        const fetchQuizDetails = async () => {
            try {
                const token = document.cookie.split( 'token=' )[1];
                if ( !token ) {
                    console.error( 'Token not found. User might not be authenticated.' );
                    return;
                }

                console.log( 'Fetching quiz details for quizId:', quizId );

                const response = await fetch( `/api/quiz-details?quizId=${ quizId }`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${ token }`,
                        'Content-Type': 'application/json',
                    },
                } );

                if ( response.ok ) {
                    const data = await response.json();
                    setQuizData( data.quiz );
                    setDifficultyLevels( data.levels );
                    setProgress( data.progress || [] );
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

        fetchQuizDetails();
    }, [quizId] );

    const getButtonClass = ( level: number ): string => {
        const isInProgress = progress.some( ( item ) => item.quiz_id === quizId && level === quizData.level );
        return isInProgress ? 'bg-amber-700 hover:bg-amber-600' : 'bg-zinc-700 hover:bg-zinc-600';
    };

    const handleDifficultySelection = ( level: number ) => {
        if ( !quizId ) return;
        sessionStorage.setItem( 'difficultyLevel', level.toString() );
        router.push( `/quiz/${ quizId }/questions` );
    };

    const getHighestScoreForLevel = ( level: number ) => {
        return userScores
            .filter( ( score ) => score.quiz_id === quizId && level === quizData.level )
            .reduce( ( max, score ) => Math.max( max, score.score ), 0 );
    };

    if ( loading ) {
        return <p className="text-center">Loading...</p>;
    }

    if ( error ) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="flex flex-col justify-center px-4 py-6 md:px-8 lg:px-10 container border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full lg:w-10/12 shadow-lg">
            <h2 className="text-center text-4xl py-5 font-extrabold dark:text-white">
                Select Difficulty Level for <br /> {quizData ? quizData.title : 'Loading...'}
            </h2>
            <div id="difficultyOptions" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3">
                {difficultyLevels.map( ( level, index ) => (
                    <Button
                        key={`${ level }__${ index }`}
                        onClick={() => handleDifficultySelection( level )}
                        className={`${ getButtonClass( level ) } transition-all duration-200`}
                    >
                        Level {level}
                        <div className="text-sm mt-1">
                            {getHighestScoreForLevel( level ) ? `High Score: ${ getHighestScoreForLevel( level ) }` : ''}
                        </div>
                    </Button>
                ) )}
            </div>
        </div>
    );
};

export default QuizDifficultyPage;
