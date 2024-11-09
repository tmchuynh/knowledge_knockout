"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LeaderboardSelectionPage: React.FC = () => {
    const router = useRouter();
    const [quizNames, setQuizNames] = useState<string[]>( [] );

    // useEffect( () => {
    //     const fetchQuizNames = async () => {
    //         if ( user && user.sub ) {
    //             try {
    //                 const response = await fetch( "/api/quiz" );
    //                 if ( response.ok ) {
    //                     const data: { title: string; }[] = await response.json();
    //                     console.log( 'Fetched quiz names:', data );

    //                     // Extract unique quiz titles using reduce
    //                     const uniqueTitles = data
    //                         .map( quiz => quiz.title )
    //                         .filter( ( title, index, self ) => self.indexOf( title ) === index );

    //                     console.log( 'Filtered quiz titles:', uniqueTitles );
    //                     setQuizNames( uniqueTitles );
    //                 } else {
    //                     console.error( 'Failed to fetch quiz names: HTTP status', response.status );
    //                 }
    //             } catch ( error ) {
    //                 console.error( 'Error fetching quiz names:', error );
    //             }
    //         }
    //     };

    //     fetchQuizNames();
    // }, [user] );

    const handleQuizSelection = ( quizName: string ) => {
        router.push( `/leaderboard/${ quizName }` );
    };

    return (
        <div className="leaderboard-selection flex flex-col justify-center items-center min-h-screen px-6 py-4 lg:px-8 bg-gray-800 text-white">
            <h2 className="text-4xl font-extrabold mb-5 text-center">Select a Quiz to View Leaderboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {quizNames.length > 0 ? (
                    quizNames.map( ( quizName, index ) => (
                        <button
                            key={index}
                            onClick={() => handleQuizSelection( quizName )}
                            className="text-white bg-green-700 hover:bg-green-800 rounded-lg px-5 py-2.5"
                        >
                            {quizName}
                        </button>
                    ) )
                ) : (
                    <p className="text-gray-400 mx-auto">No quizzes found for this user.</p>
                )}
            </div>
        </div>
    );
};

export default LeaderboardSelectionPage;
