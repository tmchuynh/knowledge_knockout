"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { Quiz } from '@/backend/models';

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
                        .map( quiz => quiz.name )
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


    if ( status === 'loading' ) {
        return <p>Loading...</p>;
    }

    // if ( !session ) {
    //     return <p className="text-center mt-10">You must be logged in to view this page.</p>;
    // }

    const handleQuizSelection = ( quizName: string, id: string ) => {
        router.push( `/leaderboard/${ quizName }&id=${ id }` );
    };

    return (
        <div className="flex flex-col min-h-screen justify-center items-center px-6 py-4 lg:px-8 container dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full lg:w-11/12">
            <h2 className="text-4xl font-extrabold mb-5 text-center">Select a Quiz to View Leaderboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {quizzes.length > 0 ? (
                    quizzes.map( ( quizName, index ) => (
                        <Button
                            key={quizName.id}
                            onClick={() => handleQuizSelection( quizName.name, quizName.id )}
                            variant={"outline"}
                        >
                            {quizName.name}
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
