"use client";

import { Progress, Score } from '@/types/interface';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface QuizDifficultyPageProps {
    params: {
        slug: string;
    };
}

const QuizDifficultyPage: React.FC<QuizDifficultyPageProps> = _props => {
    // const { slug: quizId } = params;
    const router = useRouter();
    const [progress, setProgress] = useState<Progress[]>( [] );
    const [userScores, setUserScores] = useState<Score[]>( [] );
    const [quizData, setQuizData] = useState<any>( null );
    const [difficultyLevels, setDifficultyLevels] = useState<number[]>( [] );


    // useEffect( () => {
    //     const fetchQuizDetails = async () => {
    //         try {
    //             // console.log( 'Fetching quiz details for quizId:', quizId );

    //             const response = await fetch( `/api/quiz-details?quizId=${ quizId }`, {
    //                 method: 'GET',
    //             } );

    //             console.log( "Response:", response );
    //             if ( response.ok ) {
    //                 const data = await response.json();

    //                 setQuizData( data.quiz );
    //                 setDifficultyLevels( data.levels );
    //                 setProgress( data.progress || [] );
    //                 setUserScores( data.scores || [] );
    //             } else {
    //                 console.error( 'Failed to fetch quiz details:', response.status );
    //             }
    //         } catch ( error ) {
    //             console.error( 'Error fetching quiz details:', error );
    //         }
    //     };


    //     fetchQuizDetails();
    // }, [quizId] );

    // const getButtonClass = ( level: number ): string => {
    //     const isInProgress = progress.some(
    //         ( item ) =>
    //             item.quizId === quizId &&
    //             item.current_question_index > 0 &&
    //             item.level === level
    //     );
    //     return isInProgress ? 'bg-amber-700 hover:bg-amber-600' : 'bg-zinc-700 hover:bg-zinc-600';
    // };

    // const handleDifficultySelection = ( level: number ) => {
    //     if ( !quizId ) return;
    //     sessionStorage.setItem( 'difficultyLevel', level.toString() );
    //     router.push( `/quiz/${ quizId }/questions` );
    // };

    // const getHighestScoreForLevel = ( level: number ) => {
    //     return userScores
    //         .filter( ( score ) => score.quiz === quizId && score.level === level )
    //         .reduce( ( max, score ) => Math.max( max, score.score ), 0 );
    // };

    return (
        <div className="flex flex-col  justify-center px-6 py-4 lg:px-8 container border-4 border-gray-200 dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full lg:w-11/12">
            <h2 className="text-center text-4xl py-5 font-extrabold dark:text-white">
                Select Difficulty Level for <br /> {quizData ? quizData.title : 'Loading...'}
            </h2>
            {/* <div id="difficultyOptions" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-3">
                {difficultyLevels.map( ( level,index ) => (
                    <Button
                                                        key={`${ level }__${ index }`}

                        onClick={() => handleDifficultySelection( level )}
                        className={`${ getButtonClass( level ) }`}
                        label={`Level ${level}
                        <div className="text-sm mt-1">
                            {getHighestScoreForLevel( level ) ? `High Score: ${ getHighestScoreForLevel( level ) }` : ''}
                        </div>
                        `}
                    />
                ) )}
            </div> */}
        </div>
    );
};

export default QuizDifficultyPage;
