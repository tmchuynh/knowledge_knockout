"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { Progress, Quiz, User } from '../../backend/models';
import { Button } from '@/components/ui/button';

const QuizSelectionPage: React.FC = () => {
    const [quizProgress, setQuizProgress] = useState<Progress[]>( [] );
    const [quizNames, setQuizNames] = useState<string[]>( [] );
    const [user, setUser] = useState<User | null>( null );
    const [quizzes, setQuizzes] = useState<Quiz[]>( [] );
    const router = useRouter();

    useEffect( () => {
        const fetchUserData = async () => {
            try {
                const response = await fetch( '/api/auth/me', {
                    credentials: 'include', // Ensures cookies are sent with the request
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

        const fetchQuizNames = async () => {
            try {
                const response = await fetch( "/api/quiz" );
                if ( response.ok ) {
                    const data = await response.json();

                    const uniqueData = data.filter( ( item: { subject: string; }, index: number, self: Quiz[] ) =>
                        index === self.findIndex( ( t ) => t.subject === item.subject )
                    );
                    const uniqueQuizzes = uniqueData.map( ( quiz: { subject: any; } ) => quiz.subject );

                    setQuizzes( uniqueData );
                    setQuizNames( uniqueQuizzes );
                } else {
                    console.error( 'Failed to fetch quiz names: HTTP status', response.status );
                }
            } catch ( error ) {
                console.error( 'Error fetching quiz names:', error );
            }
        };

        fetchUserData();
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
            const response = await fetch( `/api/users/${ user.id }/progress/${ quizName.subject }/${ quizName.level }`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ document.cookie.split( 'token=' )[1] }`, // Retrieve token from cookies
                },
                body: JSON.stringify( { quizName } ),
            } );

            if ( !response.ok ) throw new Error( `Request failed with status ${ response.status }` );

            const data = await response.json();
            console.log( 'Progress updated:', data );
            // Optionally redirect to another page or show success message
        } catch ( error ) {
            console.error( 'Error updating quiz progress:', error );
        }
    };

    const getButtonClass = ( _quizId: string ): string => {
        const inProgress = quizProgress.some( ( item ) => item.id === _quizId );
        return inProgress ? 'bg-amber-700 hover:bg-amber-600' : 'bg-zinc-700 hover:bg-zinc-600';
    };

    return (
        <div className="flex flex-col justify-center items-center px-4 py-6 md:px-8 container dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-auto align-center w-full lg:w-10/12 shadow-md border hover:shadow-lg">
            <h2 className="text-center text-4xl py-5 font-extrabold dark:text-white">Select a Quiz</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-3 w-full">
                {quizzes.map( ( quizName, index ) => (
                    <Button
                        key={`${ quizName.id }__${ index }`}
                        onClick={() => handleQuizSelection( quizName )}
                        className={`${ getButtonClass( quizName.id! ) } transition-all duration-200`}
                    >
                        {quizName.subject}
                    </Button>
                ) )}
            </div>

            <div className="flex justify-center mt-5 space-x-4">
                <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                    <span className="flex w-4 h-4 bg-zinc-700 rounded-full mr-1.5"></span>New
                </span>
                <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                    <span className="flex w-4 h-4 bg-amber-700 rounded-full mr-1.5"></span>In Progress
                </span>
            </div>
        </div>
    );
};

export default QuizSelectionPage;
