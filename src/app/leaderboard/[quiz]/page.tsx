// app/leaderboard/[slug]/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type LeaderboardEntry = {
    username: string;
    score: number;
    date: string;
    level: number;
};

const getLeaderboardDataByLevel = async ( quizName: string ): Promise<Map<number, LeaderboardEntry[]>> => {
    const leaderboardDataByLevel = new Map<number, LeaderboardEntry[]>();

    try {
        const response = await fetch( `/api/leaderboard/${ quizName }` );
        if ( !response.ok ) {
            throw new Error( 'Failed to fetch leaderboard data' );
        }

        const leaderboardData: LeaderboardEntry[] = await response.json();

        leaderboardData.forEach( ( entry ) => {
            if ( !leaderboardDataByLevel.has( entry.level ) ) {
                leaderboardDataByLevel.set( entry.level, [] );
            }
            leaderboardDataByLevel.get( entry.level )!.push( entry );
        } );

        leaderboardDataByLevel.forEach( ( entries ) => entries.sort( ( a, b ) => b.score - a.score ) );
    } catch ( error ) {
        console.error( 'Error fetching leaderboard data:', error );
    }

    return leaderboardDataByLevel;
};

const LeaderboardPage: React.FC = () => {
    const { quizName } = useParams();
    const [leaderboard, setLeaderboard] = useState<Map<number, LeaderboardEntry[]> | null>( null );

    const quizNameStr = Array.isArray( quizName ) ? quizName[0] : quizName;

    useEffect( () => {
        const fetchLeaderboard = async () => {
            if ( quizNameStr ) {
                const data = await getLeaderboardDataByLevel( quizNameStr );
                setLeaderboard( data );
            }
        };

        fetchLeaderboard();
    }, [quizNameStr] );

    if ( !quizNameStr ) return <p>Loading...</p>;

    return (
        <div className="leaderboard-page flex flex-col justify-center items-center min-h-screen px-6 py-4 lg:px-8 bg-gray-800 text-white">
            <h2 className="text-4xl font-extrabold mb-5 text-center">Leaderboard for {quizNameStr}</h2>
            {leaderboard && [...leaderboard.keys()].sort( ( a, b ) => a - b ).map( ( level ) => (
                <div key={level} className="w-full mb-6">
                    <h3 className="text-2xl mb-3">Level {level}</h3>
                    <table className="w-full text-left bg-gray-700 rounded-lg">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Rank</th>
                                <th className="px-4 py-2">Score</th>
                                <th className="px-4 py-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.get( level )!.map( ( entry, index ) => (
                                <tr key={index} className="bg-gray-600 border-b">
                                    <td className="px-4 py-2 text-center">{index + 1}</td>
                                    <td className="px-4 py-2 text-center">{entry.score}%</td>
                                    <td className="px-4 py-2 text-center">{new Date( entry.date ).toLocaleDateString()}</td>
                                </tr>
                            ) )}
                        </tbody>
                    </table>
                </div>
            ) )}
        </div>
    );
};

export default LeaderboardPage;
