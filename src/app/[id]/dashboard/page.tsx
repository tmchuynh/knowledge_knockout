// app/[id]/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ColorPickerComponent from '../../components/ColorPicker';
import ContributionsGrid from '../../components/ContributionsGrid';
import { User } from '@/types';

const DashboardPage: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const [userProfile, setUserProfile] = useState<User | null>( null );
    const [baseColor, setBaseColor] = useState( '#6a40d4' );

    // useEffect( () => {
    //     if ( !isLoading ) {
    //         if ( !user || user.sub !== params.id ) {
    //             router.push( '/api/auth/login' );
    //         } else {
    //             console.log( user.sub );
    //             loadUserProfile( user.sub );
    //         }
    //     }
    // }, [isLoading, user, params.id] );

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
            <div className="dashboard-container flex flex-col items-center min-h-screen px-6 py-4 lg:px-8 bg-gray-800 text-white rounded-lg w-full lg:w-2/3">
                <h2 className="text-4xl font-extrabold mb-5">User Profile</h2>
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
