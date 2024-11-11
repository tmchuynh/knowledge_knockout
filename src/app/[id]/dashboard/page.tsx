'use client';

import { User } from '@/types';
import { useSession } from "next-auth/react";
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ColorPickerComponent from '@/app/components/ColorPicker';
import ContributionsGrid from '@/app/components/ContributionsGrid';

const DashboardPage: React.FC = () => {
    const [userProfile, setUserProfile] = useState<User | null>( null );
    const [baseColor, setBaseColor] = useState( '#6a40d4' );
    const { data: session, status } = useSession();
    const { id } = useParams();
    const router = useRouter();

    useEffect( () => {
        if ( !session?.user || session?.user.name !== id ) {
            router.push( '/api/auth/signin' );
        } else {
            console.log( session?.user.name );
            loadUserProfile( session?.user.name );
        }
    }, [session?.user, id] );

    const loadUserProfile = async ( userId: string | undefined ) => {
        try {
            const response = await fetch( `/api/users/${ userId }` );
            if ( !response.ok ) {
                console.error( 'Failed to load user profile' );
                return;
            }
            const data = await response.json();
            setUserProfile( data );
        } catch ( error ) {
            console.error( 'Error fetching user profile:', error );
        }
    };

    return (
        <>
            <div className="dashboard-container flex flex-col items-center min-h-screen px-6 py-4 lg:px-8 bg-gray-800 text-white w-full">
                <h2 className="text-4xl font-extrabold mb-5">User Profile</h2>
                <div className="col-span-full">
                    <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">Photo</label>
                    <div className="mt-2 flex items-center gap-x-3">
                        <svg className="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
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
                {userProfile && (
                    <div className="profile-info space-y-4">
                        <p>ID: {userProfile.user_id}</p>
                        <p>Created At: {new Date( userProfile.created_at ).toLocaleDateString()}</p>
                    </div>
                )}
                <ColorPickerComponent onColorChange={setBaseColor} />
                <ContributionsGrid baseColor={baseColor} />
            </div>
        </>
    );
};

export default DashboardPage;
