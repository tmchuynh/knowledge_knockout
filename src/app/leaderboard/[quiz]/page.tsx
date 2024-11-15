"use client";

import React, { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { LeaderboardEntry } from '@/types/interface';
import { DataTable } from './data-table';
import { columns } from './columns';

const LeaderboardPage: React.FC = () => {
    const { quizName } = useParams() || {};
    const pathname = usePathname();
    const segments = pathname.split( '/' ).filter( Boolean );
    const currentTitle = segments.length > 1 ? decodeURIComponent( segments[1] ) : '';

    const [data, setData] = useState<LeaderboardEntry[]>( [] );
    const [loading, setLoading] = useState( true );
    const [error, setError] = useState<string | null>( null );

    useEffect( () => {
        const fetchLeaderboardData = async () => {
            if ( !currentTitle ) {
                setError( 'Quiz name is not available' );
                setLoading( false );
                return;
            }

            try {
                console.log( 'Fetching data for quiz:', currentTitle );
                const response = await fetch( `/api/leaderboard/${ encodeURIComponent( currentTitle ) }`, {
                    credentials: 'include', // Ensure cookies are included for authentication
                } );

                if ( !response.ok ) {
                    throw new Error( `Failed to fetch leaderboard data: ${ response.statusText }` );
                }

                const fetchedData = await response.json();
                setData( fetchedData );
            } catch ( error ) {
                console.error( 'Error fetching leaderboard data:', error );
                setError( 'Failed to load leaderboard data. Please try again later.' );
            } finally {
                setLoading( false );
            }
        };

        fetchLeaderboardData();
    }, [currentTitle] );

    if ( loading ) {
        return <p className="text-center text-white">Loading...</p>;
    }

    if ( error ) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="leaderboard-page flex flex-col justify-center items-center px-4 py-6 lg:px-8 bg-gray-900 text-white rounded-md shadow-md w-full max-w-screen-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center">
                Leaderboard for {quizName || 'Unknown Quiz'}
            </h2>
            <div className="w-full overflow-x-auto mb-6">
                {data.length > 0 ? (
                    <DataTable columns={columns} data={data} quiz={currentTitle} />
                ) : (
                    <p className="text-center text-gray-400">No data available for this leaderboard.</p>
                )}
            </div>
        </div>
    );
};

export default LeaderboardPage;
