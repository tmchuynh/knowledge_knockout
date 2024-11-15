'use client';

import { Score } from '@/backend/models';
import React, { useEffect, useState } from 'react';
import dotenv from 'dotenv';
import ScoresPage from '../scores/page';
import ContributionHeatmap from '@/components/ContributionHeatmap';

dotenv.config();

const DashboardPage: React.FC = () => {
    const [baseColor, setBaseColor] = useState( '#6a40d4' );
    const [scores, setScores] = useState<Score[]>( [] );
    const [user, setUser] = useState<{ id: string; username: string; } | null>( null );

    useEffect( () => {
        const fetchUserFromJWT = async () => {
            try {
                const response = await fetch( '/api/auth/me', {
                    credentials: 'include',
                } );

                if ( !response.ok ) {
                    throw new Error( `Failed to fetch user, status: ${ response.status }` );
                }

                const data = await response.json();
                setUser( data );
            } catch ( error ) {
                console.error( 'Failed to fetch user data:', error );
            }
        };


        fetchUserFromJWT();
    }, [] );

    useEffect( () => {
        if ( user?.username ) {
            console.log( "user.username", user.username );
            const fetchScores = async () => {
                try {
                    // No need to attach Authorization header manually; cookies are sent automatically
                    const response = await fetch( `/api/score/username/${ user.username }`, {
                        credentials: 'include',
                    } );

                    if ( !response.ok ) {
                        throw new Error( `Failed to fetch scores. Status: ${ response.status }` );
                    }

                    const data = await response.json();
                    setScores( data );
                } catch ( error ) {
                    console.error( 'Error fetching scores:', error );
                }
            };

            fetchScores();
        }
    }, [user] );

    return (
        <>
            <div className="dashboard-container flex flex-col items-center px-6 py-4 lg:px-8 m-4  rounded-lg shadow-md border hover:shadow-md w-11/12 mx-auto">
                <h2 className="text-4xl font-extrabold mb-5">User Profile</h2>
                <div className="w-full mx-auto">
                    <div className="mt-2 flex flex-col sm:flex-row items-center gap-x-3">
                        <svg className="h-12 w-12 text-gray-300 mb-2 sm:mb-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>
                        <button type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            Change
                        </button>
                    </div>
                </div>
                <div className='w-full mx-auto'>
                    {scores.length > 0 ? <ScoresPage /> : <></>}
                    {user ? (
                        <>
                            <div className="profile-info space-y-4">
                                <p>ID: {user.id || 'N/A'}</p>
                                <p>Username: {user.username || 'N/A'}</p>
                            </div>
                            {scores.length > 0 ? <ContributionHeatmap />
                                : <></>}
                        </>
                    ) : (
                        <p>Loading user information...</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default DashboardPage;
