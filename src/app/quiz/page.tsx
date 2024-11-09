// app/quiz/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressItem, Quiz } from '@/types';

const QuizSelectionPage: React.FC = () => {
    const router = useRouter();
    const [quizzes, setQuizzes] = useState<Quiz[]>( [] );
    const [quizProgress] = useState<ProgressItem[]>( [] );
    const [quizNames, setQuizNames] = useState<string[]>( [] );

    // useEffect( () => {
    //     const fetchQuizNames = async () => {
    //         try {
    //             const response = await fetch( "/api/quiz" );
    //             if ( response.ok ) {
    //                 const data = await response.json();

    //                 const uniqueData = data.filter( ( item: { title: any; }, index: any, self: any[] ) =>
    //                     index === self.findIndex( ( t ) => t.title === item.title )
    //                 );

    //                 setQuizzes( uniqueData );


    //                 setQuizNames( uniqueData.map( ( quiz: { title: any; } ) => quiz.title ) );
    //             } else {
    //                 console.error( 'Failed to fetch quiz names: HTTP status', response.status );
    //             }
    //         } catch ( error ) {
    //             console.error( 'Error fetching quiz names:', error );
    //         }
    //     };

    //     fetchQuizNames();
    // }, [user] );

    // const handleQuizSelection = async ( quizName: string ) => {
    //     const quizTitle = quizNames.find( ( quiz ) => quiz === quizName ) || '';
    //     const quiz_id = quizzes.find( ( quiz ) => quiz.title === quizTitle )?.quiz_id || '';

    //     if ( !user?.sub || !quizTitle ) {
    //         console.error( 'User ID or quiz title is missing' );
    //         router.push( '/api/auth/login' );
    //         return;
    //     }

    //     try {
    //         const response = await fetch( '/api/user-progress', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify( {
    //                 userId: user.sub,
    //                 quizId: quiz_id,
    //                 current_question_index: 0,
    //                 score: 0,
    //                 completed: false,
    //             } ),
    //         } );

    //         if ( !response.ok ) {
    //             const errorData = await response.json();
    //             console.error( 'Server responded with error:', errorData );

    //             throw new Error( 'Failed to update quiz progress' );
    //         }

    //         router.push( `/quiz/${ quizTitle }/difficulty/` );
    //     } catch ( error ) {
    //         console.error( 'Error updating quiz progress:', error );
    //     }
    // };


    const getButtonClass = ( quizId: string ): string => {
        const inProgress = quizProgress.some( ( item ) => item.quizId === quizId && item.current_question_index > 0 );
        return inProgress ? 'bg-amber-700 hover:bg-amber-600' : 'bg-zinc-700 hover:bg-zinc-600';
    };

    return (
        <div className="flex flex-col min-h-full justify-center items-center px-6 py-4 lg:px-8 container border-4 border-gray-200 dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full lg:w-11/12">
            <h2 className="text-center text-4xl py-5 font-extrabold dark:text-white">Select a Quiz</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3 w-full">
                {quizNames.map( ( quizName, index ) => (
                    <button
                        key={index}
                        // onClick={() => handleQuizSelection( quizName )}
                        className={`button text-white ${ getButtonClass( quizName ) } focus:ring-4 focus:outline-none font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center`}
                    >
                        {quizName}
                    </button>
                ) )}
            </div>

            <div className="flex justify-center mt-5 space-x-4">
                <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                    <span className="flex w-4 h-4 bg-zinc-700 rounded-full mr-1.5 flex-shrink-0"></span>New
                </span>
                <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                    <span className="flex w-4 h-4 bg-amber-700 rounded-full mr-1.5 flex-shrink-0"></span>In Progress
                </span>
            </div>
        </div>
    );
};

export default QuizSelectionPage;
