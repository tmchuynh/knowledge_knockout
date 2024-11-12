"use client";

import React, { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { LeaderboardEntry } from '@/types';
import { DataTable } from './data-table';
import { columns } from './columns';

const LeaderboardPage: React.FC = () => {
    const { quizName } = useParams() || {};
    const pathname = usePathname();
    const segments = pathname.split( '/' ).filter( Boolean );
    const currentTitle = segments.length > 1 ? segments[1] : '';

    const [data, setData] = useState<LeaderboardEntry[]>( [] );
    const [loading, setLoading] = useState( true );
    const [error, setError] = useState<string | null>( null );
    const [leaderboardData, setLeaderboardData] = useState( [] );

    useEffect( () => {
        const fetchLeaderboardData = async () => {
            if ( !currentTitle ) {
                setError( 'Quiz name is not available' );
                setLoading( false );
                return;
            }

            try {
                console.log( 'Current title:', currentTitle );
                const response = await fetch( `/api/leaderboard/${ encodeURIComponent( currentTitle ) }` );

                if ( !response.ok ) {
                    throw new Error( `Failed to fetch leaderboard data: ${ response.statusText }` );
                }
                const data = await response.json();
                setLeaderboardData( data );
            } catch ( error ) {
                console.error( 'Error fetching leaderboard data:', error );
                setError( 'Failed to load leaderboard data' );
            } finally {
                setLoading( false );
            }
        };

        fetchLeaderboardData();
    }, [currentTitle] );

    if ( loading ) {
        return <p className="text-center">Loading...</p>;
    }

    if ( error ) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="leaderboard-page flex flex-col justify-center items-center min-h-screen px-6 py-4 lg:px-8 bg-gray-800 text-white">
            <h2 className="text-4xl font-extrabold mb-5 text-center">Leaderboard for {quizName}</h2>
            <div className="w-full mb-6">
                <DataTable columns={columns} data={data} quiz={currentTitle} />
            </div>
        </div>
    );
};

export default LeaderboardPage;
