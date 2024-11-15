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
        const token = localStorage.getItem( 'token' );
        if ( !token ) {
            console.error( 'No token found. User might not be authenticated.' );
            // Optionally redirect to login or show an unauthenticated message
            return;
        }

        const fetchUserFromJWT = async ( token: string ) => {
            try {
                const response = await fetch( '/api/auth/me', {
                    headers: {
                        Authorization: `Bearer ${ token }`,
                    },
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

        fetchUserFromJWT( token );
    }, [] );

    useEffect( () => {
        const token = localStorage.getItem( 'token' );
        if ( !token ) {
            console.error( 'No token found. User might not be authenticated.' );
            return;
        }

        if ( user?.username ) {
            const fetchScores = async () => {
                try {
                    const response = await fetch( `/api/score?username=${ user.username }`, {
                        headers: {
                            Authorization: `Bearer ${ token }`,
                            'Content-Type': 'application/json',
                        },
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
            <div className="dashboard-container flex flex-col items-center  px-6 py-4 lg:px-8  w-full">
                <h2 className="text-4xl font-extrabold mb-5">User Profile</h2>
                <div className="col-span-full">
                    <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">Photo</label>
                    <div className="mt-2 flex items-center gap-x-3">
                        <svg className="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>
                        <button type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
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
