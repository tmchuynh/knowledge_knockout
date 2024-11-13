"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Quiz } from '../../backend/models';
import { Button } from '../../components/ui/button';

const LeaderboardSelectionPage: React.FC = () => {
    const router = useRouter();
    const [quizNames, setQuizNames] = useState<string[]>( [] );
    const [quizzes, setQuizzes] = useState<Quiz[]>( [] );

    function uniqByKeepLast( data: any[], key: string ) {
        return [
            ...new Map(
                data.map( x => [x[key], x] )
            ).values()
        ];
    }


    useEffect( () => {
        const fetchQuizNames = async () => {
            try {
                const response = await fetch( "/api/quiz" );
                if ( response.ok ) {
                    const data: Quiz[] = await response.json();
                    console.log( 'Fetched quiz names:', data );

                    // Extract unique quiz titles
                    const uniqueTitles = data
                        .map( quiz => quiz.subject )
                        .filter( ( name, index, self ) => self.indexOf( name ) === index );

                    // Debugging uniqByKeepLast function
                    const uniqueData = uniqByKeepLast( data, 'name' );
                    console.log( 'Unique quizzes by name:', uniqueData );
                    setQuizzes( uniqueData );

                    setQuizNames( uniqueTitles );
                    console.log( 'Filtered quiz titles:', uniqueTitles );
                } else {
                    console.error( 'Failed to fetch quiz names: HTTP status', response.status );
                }
            } catch ( error ) {
                console.error( 'Error fetching quiz names:', error );
            }
        };

        fetchQuizNames();
    }, [] );


    const handleQuizSelection = ( quizName: string, id: string ) => {
        router.push( `/leaderboard/${ quizName }&id=${ id }` );
    };

    return (
        <div className="flex flex-col  justify-center items-center px-6 py-4 lg:p-10 container dark:border-gray-100 shadow-md border hover:shadow-md dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full lg:w-11/12">
            <h2 className="text-4xl font-extrabold mb-5 text-center">Select a Quiz to View Leaderboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {quizzes.length > 0 ? (
                    quizzes.map( ( quizName, index ) => (
                        <Button
                            key={`${ quizName.id }__${ index }`}
                            onClick={() => handleQuizSelection( quizName.subject, quizName.id! )}
                            variant={"outline"}
                        >
                            {quizName.subject}
                        </Button>
                    ) )
                ) : (
                    <p className="text-gray-400 mx-auto">No quizzes found for this user.</p>
                )}
            </div>
        </div>
    );
};

export default LeaderboardSelectionPage;
