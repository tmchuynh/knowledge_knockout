'use client';

import { Score } from '@/backend/models';
import ColorPickerComponent from '@/components/ColorPicker';
import ContributionsGrid from '@/components/ContributionsGrid';
import React, { useEffect, useState } from 'react';
import dotenv from 'dotenv';

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
            const fetchScores = async () => {
                try {
                    // No need to attach Authorization header manually; cookies are sent automatically
                    const response = await fetch( `/api/score?username=${ user.username }`, {
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
            <div className="dashboard-container flex flex-col items-center px-6 py-4 lg:px-8 w-full">
                <h2 className="text-4xl font-extrabold mb-5">User Profile</h2>
                <div className="col-span-full">
                    <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">Photo</label>
                    <div className="mt-2 flex items-center gap-x-3">
                        {/* Photo component */}
                    </div>
                </div>
                <div className="col-span-full">
                    <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">About</label>
                    <div className="mt-2">
                        <textarea id="about" name="about" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></textarea>
                    </div>
                    <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p>
                </div>
                {user ? (
                    <>
                        <div className="profile-info space-y-4">
                            <p>ID: {user.id || 'N/A'}</p>
                            <p>Username: {user.username || 'N/A'}</p>
                        </div>
                        <ColorPickerComponent onColorChange={setBaseColor} />
                        <ContributionsGrid baseColor={baseColor} />
                    </>
                ) : (
                    <p>Loading user information...</p>
                )}
            </div>
        </>
    );
};

export default DashboardPage;
