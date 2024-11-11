'use client';

import { Progress } from '@/types';
import React, { useEffect, useState } from 'react';
import { Quiz, User } from '@/backend/models';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button, buttonVariants } from '../components/ui/button';

const QuizSelectionPage: React.FC = () => {
    const [quizProgress] = useState<Progress[]>( [] );
    const [quizNames, setQuizNames] = useState<string[]>( [] );
    const [progress, setProgress] = useState<Progress>();
    const [user, setUser] = useState<User>();
    const [quizzes, setQuizzes] = useState<Quiz[]>( [] );
    const router = useRouter();
    const session = useSession();

    useEffect( () => {
        const fetchQuizNames = async () => {
            try {
                const response = await fetch( "/api/quiz" );
                if ( response.ok ) {
                    const data = await response.json();

                    const uniqueData = data.filter( ( item: { name: string; }, index: number, self: Quiz[] ) =>
                        index === self.findIndex( ( t ) => t.name === item.name )
                    );
                    const uniqueQuizzes = uniqueData.map( ( quiz: { name: any; } ) => quiz.name );

                    setQuizzes( uniqueData );
                    setQuizNames( uniqueQuizzes );
                    console.log( "Quizzes", quizzes );
                } else {
                    console.error( 'Failed to fetch quiz names: HTTP status', response.status );
                }
            } catch ( error ) {
                console.error( 'Error fetching quiz names:', error );
            }
        };

        fetchQuizNames();
    }, [user] );

    const handleQuizSelection = async ( id: string, name: string, index: number ) => {
        const quiz_id = quizzes.find( ( quiz ) => quiz.id === id ) || '';

        if ( session.data?.user || !name ) {
            console.error( 'User ID or quiz title is missing' );
            router.push( '/api/auth/signin' );
            return;
        }

        try {
            const response = await fetch( `/api/users/progress/${ name }/${ index }`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( {
                    userId: user,
                    quizId: quiz_id,
                    current_question_index: 0,
                    score: 0,
                    completed: false,
                } ),
            } );

            if ( !response.ok ) {
                const errorData = await response.json();
                console.error( 'Server responded with error:', errorData );

                throw new Error( 'Failed to update quiz progress' );
            }

            router.push( `/quiz/${ name }/difficulty/` );
        } catch ( error ) {
            console.error( 'Error updating quiz progress:', error );
        }
    };


    const getButtonClass = ( quizId: string ): string => {
        const inProgress = quizProgress.some( ( item ) => item.progress_id === progress?.progress_id );
        return inProgress ? 'bg-amber-700 hover:bg-amber-600' : 'bg-zinc-700 hover:bg-zinc-600';
    };

    return (
        <div className="flex flex-col min-h-full justify-center items-center px-6 py-4 lg:px-8 container border-4 border-gray-200 dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full lg:w-11/12">
            <h2 className="text-center text-4xl py-5 font-extrabold dark:text-white">Select a Quiz</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3 w-full">
                {quizzes.map( ( quizName, index ) => (
                    <Button
                        key={index}
                        onClick={() => handleQuizSelection( quizName.id, quizName.name, index )}
                        className={`${ getButtonClass( quizName.id ) }`}
                    >
                        {`${ quizName.name }`}
                    </Button>
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
