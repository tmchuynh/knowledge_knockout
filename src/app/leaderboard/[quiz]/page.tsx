"use client";

import { LeaderboardEntry } from '@/types';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Table from '@/app/components/ui/table';

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

    const headers = ['Username', 'Quiz', 'Level', 'Score', 'Date Completed'];

    // Transforms the LeaderboardEntry into a format that Table expects
    const transformRowData = ( entry: LeaderboardEntry, _index: number ) => ( {
        username: entry.username,
        quiz: quizNameStr,
        level: entry.level,
        score: entry.score,
        date_completed: entry.date_completed.toDateString(),
    } );

    const renderRow = ( row: { username: string, quiz: string, level: number, score: number, date_completed: string; }, index: number ) => (
        <tr key={index} className="bg-gray-600 border-b">
            <td className="px-4 py-2 text-center">{row.username}</td>
            <td className="px-4 py-2 text-center">{row.quiz}</td>
            <td className="px-4 py-2 text-center">{row.level}</td>
            <td className="px-4 py-2 text-center">{row.score}</td>
            <td className="px-4 py-2 text-center">{row.date_completed}</td>
        </tr>
    );

    return (
        <div className="leaderboard-page flex flex-col justify-center items-center min-h-screen px-6 py-4 lg:px-8 bg-gray-800 text-white">
            <h2 className="text-4xl font-extrabold mb-5 text-center">Leaderboard for {quizNameStr}</h2>
            {leaderboard &&
                [...leaderboard.keys()]
                    .sort( ( a, b ) => a - b )
                    .map( ( level ) => {
                        const data = leaderboard.get( level ) || [];
                        const transformedData = data.map( ( entry, index ) => transformRowData( entry, index ) );

                        return (
                            <div key={level} className="w-full mb-6">
                                <h3 className="text-2xl mb-3">Level {level}</h3>
                                <Table headers={headers} data={transformedData} renderRow={renderRow} />
                            </div>
                        );
                    } )}
        </div>
    );
};

export default LeaderboardPage;
