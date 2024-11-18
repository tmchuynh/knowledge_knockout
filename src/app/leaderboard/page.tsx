"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Quiz, Score } from '../../backend/models';
import { Button } from '@/components/ui/button';
import { data } from 'jquery';
import { response } from 'express';
import router from 'next/router';

const LeaderboardSelectionPage: React.FC = () => {
    const router = useRouter();
    const [scores, setScores] = useState<Score[]>( [] );
    const [leaderboard, setLeaderboard] = useState<any>();

    function uniqByKeepLast( data: any[], key: string ) {
        return [
            ...new Map(
                data.map( x => [x[key], x] )
            ).values()
        ];
    }

    useEffect( () => {
        const checkExistingScore = async () => {
            try {
                const response = await fetch( "/api/score", {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                } );

                if ( response.ok ) {
                    const data: any = await response.json();
                    setScores( data );

                    const existingLeaderboards = await Promise.all(
                        data.map( async ( score: { quiz_id: string; } ) => {

                            try {
                                // Fetch quiz data and log the result for each score
                                const quiz: Quiz = await fetchQuiz( score.quiz_id );
                                console.log( "Fetched Quiz for score ID:", score.quiz_id, "Quiz Data:", quiz );

                                return { ...score, quiz }; // Return combined object of score and quiz
                            } catch ( error ) {
                                console.error( "Error fetching quiz for score ID:", score.quiz_id, error );
                                return null; // Handle failed fetch gracefully
                            }
                        } ) );


                    // Check if the quiz_id exists in quizIDs and log the result
                    const filteredLeaderboards = existingLeaderboards
                        .filter( ( subject, index, self ) =>
                            subject && self.findIndex( ( s ) => s?.quiz?.subject === subject?.quiz?.subject ) === index
                        );     // Add quiz data to the score object);


                    console.log( "filtered leaderboards:", filteredLeaderboards );

                    setLeaderboard( filteredLeaderboards );
                } else {
                    console.error( 'Failed to check existing score: HTTP status', response.status );
                }
            } catch ( error ) {
                console.error( 'Error checking existing score:', error );
            }
        };


        const fetchQuiz = async ( quizId: string ) => {
            try {
                const response = await fetch( `/api/quiz/id/${ quizId }`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                } );

                if ( !response.ok ) {
                    throw new Error( `Failed to fetch quiz subject. Status: ${ response.status }` );
                }

                const data = await response.json();
                return data;
            } catch ( error ) {
                console.error( 'Error fetching quiz subject:', error );
                throw error;
            }
        };

        checkExistingScore();
    }, [] );

    const handleQuizSelection = ( quizName: string, id: string ) => {
        router.push( `/leaderboard/${ quizName }/${ id }` );
    };

    return (
        <div className="flex flex-col justify-center items-center px-6 py-4 lg:p-10 container dark:border-gray-100 dark:bg-gray-800 dark:text-white my-4 lg:w-11/12 p-6 rounded-lg shadow-md border hover:shadow-md w-11/12 mx-auto">
            <h2 className="text-center text-gray-800 dark:text-gray-100">Select a Quiz to View Leaderboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {leaderboard ? (
                    leaderboard.map( ( score: Score, index: number ) => (
                        <Button
                            key={`${ score.id }__${ index }`}
                            onClick={() => handleQuizSelection( score.quiz.subject, score.quiz.id! )}
                            variant={"outline"}
                        >
                            {score.quiz.subject}
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
