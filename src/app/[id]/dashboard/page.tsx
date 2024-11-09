'use client';

import { User } from '@/types';
import { useSession } from "next-auth/react";
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ColorPickerComponent from '../../components/ColorPicker';
import ContributionsGrid from '../../components/ContributionsGrid';

const DashboardPage: React.FC = () => {
    const [userProfile, setUserProfile] = useState<User | null>( null );
    const [baseColor, setBaseColor] = useState( '#6a40d4' );
    const { data: session, status } = useSession();
    const { id } = useParams();
    const router = useRouter();

    useEffect( () => {
        if ( !session?.user || session?.user.name !== id ) {
            router.push( '/api/auth/login' );
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
