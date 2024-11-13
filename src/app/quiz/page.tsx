'use client';

import { Progress } from '@/types/interface';
import React, { useEffect, useState } from 'react';
import { Quiz, User } from '@/backend/models';
import { useRouter } from "next/navigation";
import { Button } from '../components/ui/button';

const QuizSelectionPage: React.FC = () => {
    const [quizProgress] = useState<Progress[]>( [] );
    const [quizNames, setQuizNames] = useState<string[]>( [] );
    const [progress, setProgress] = useState<Progress>();
    const [user, setUser] = useState<User | null>( null );
    const [quizzes, setQuizzes] = useState<Quiz[]>( [] );
    const router = useRouter();

    useEffect( () => {
        // Fetch the current user's information
        const fetchUser = async () => {
            try {
                const response = await fetch( '/api/auth/session' );
                if ( !response.ok ) {
                    throw new Error( `Failed to fetch user data, status: ${ response.status }` );
                }
                const data = await response.json();
                console.log( 'User data:', data );
                setUser( data.user );
            } catch ( error ) {
                console.error( 'Error fetching user data:', error );
            }
        };


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
                    console.log( "Quizzes", uniqueData );
                } else {
                    console.error( 'Failed to fetch quiz names: HTTP status', response.status );
                }
            } catch ( error ) {
                console.error( 'Error fetching quiz names:', error );
            }
        };
        fetchUser();

        fetchQuizNames();
    }, [] );

    const handleQuizSelection = async ( quizName: Quiz ) => {
        if ( !user || !user.id ) {
            console.error( 'User not found' );
            return;
        }

        const quiz = quizzes.find( ( quiz ) => quiz.id === quizName.id );
        if ( !quiz ) {
            console.error( 'Quiz not found' );
            return;
        }

        try {
            const response = await fetch( `/api/users/${ user.id }/progress/${ quizName.name }/${ quizName.level }`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( { quizName } ),
            } );
            if ( !response.ok ) throw new Error( `Request failed with status ${ response.status }` );

            const data = await response.json();
            console.log( 'Progress updated:', data );
        } catch ( error ) {
            console.error( 'Error updating quiz progress:', error );
        }
    };

    const getButtonClass = ( _quizId: string ): string => {
        const inProgress = quizProgress.some( ( item ) => item.progress_id === progress?.progress_id );
        return inProgress ? 'bg-amber-700 hover:bg-amber-600' : 'bg-zinc-700 hover:bg-zinc-600';
    };

    return (
        <div className="flex flex-col min-h-screen justify-center items-center px-6 py-4 lg:px-8 container dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full lg:w-11/12">
            <h2 className="text-center text-4xl py-5 font-extrabold dark:text-white">Select a Quiz</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3 w-full">
                {quizzes.map( ( quizName, index ) => (
                    <Button
                        key={index}
                        onClick={() => handleQuizSelection( quizName )}
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
