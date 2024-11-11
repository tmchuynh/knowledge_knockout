"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { User } from "@/types";
import { Button } from '@/app/components/ui/button';

const LeaderboardSelectionPage: React.FC = () => {
    const router = useRouter();
    const [quizNames, setQuizNames] = useState<string[]>( [] );
    const [user, setUser] = useState<User | null>( null );
    const { data: session } = useSession();

    useEffect( () => {
        const fetchQuizNames = async () => {
            if ( session?.user ) {
                try {
                    const response = await fetch( "/api/quiz" );
                    if ( response.ok ) {
                        const data: { title: string; }[] = await response.json();
                        console.log( 'Fetched quiz names:', data );

                        // Extract unique quiz titles using reduce
                        const uniqueTitles = data
                            .map( quiz => quiz.title )
                            .filter( ( title, index, self ) => self.indexOf( title ) === index );

                        console.log( 'Filtered quiz titles:', uniqueTitles );
                        setQuizNames( uniqueTitles );
                    } else {
                        console.error( 'Failed to fetch quiz names: HTTP status', response.status );
                    }
                } catch ( error ) {
                    console.error( 'Error fetching quiz names:', error );
                }
            }
        };

        fetchQuizNames();
    }, [session?.user] );

    const handleQuizSelection = ( quizName: string ) => {
        router.push( `/leaderboard/${ quizName }` );
    };

    return (
        <div className="leaderboard-selection flex flex-col justify-center items-center min-h-screen px-6 py-4 lg:px-8 bg-gray-800 text-white">
            <h2 className="text-4xl font-extrabold mb-5 text-center">Select a Quiz to View Leaderboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {quizNames.length > 0 ? (
                    quizNames.map( ( quizName, index ) => (
                        <Button
                            key={index}
                            onClick={() => handleQuizSelection( quizName )}
                            variant={"outline"}
                        >
                            {quizName}
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
