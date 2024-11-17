"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { Quiz, User } from '../../backend/models';
import { Button } from '@/components/ui/button';

const QuizSelectionPage: React.FC = () => {
    const [quizNames, setQuizNames] = useState<string[]>( [] );
    const [quizzes, setQuizzes] = useState<Quiz[]>( [] );
    const router = useRouter();

    useEffect( () => {
        if ( sessionStorage.getItem( 'reloaded' ) ) {
            window.location.reload();
            sessionStorage.removeItem( 'reloaded' );
        }

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

        fetchQuizNames();
    }, [] );

    const handleQuizSelection = async ( quizName: Quiz ) => {
        router.push( `/quiz/${ quizName.subject }` );
    };

    return (
        <div className="flex flex-col justify-center items-center px-4 py-6 md:px-8 container dark:border-gray-100 dark:bg-gray-800 dark:text-white my-auto align-center lg:w-10/12 p-6 rounded-lg shadow-md border hover:shadow-md w-11/12 mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Select a Quiz</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-3 w-full">
                {quizzes.map( ( quizName, index ) => (
                    <Button
                        key={`${ quizName.id }__${ index }`}
                        onClick={() => handleQuizSelection( quizName )}
                        className={`transition-all duration-200`}
                    >
                        {quizName.subject}
                    </Button>
                ) )}
            </div>
        </div>
    );
};

export default QuizSelectionPage;
