'use client';

import { Score, User } from '@/backend/models';
import React, { useEffect, useState } from 'react';
import dotenv, { config } from 'dotenv';
import ScoresPage from '../scores/page';
import ContributionHeatmap from '@/components/ContributionHeatmap';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';

dotenv.config();

const DashboardPage: React.FC = () => {
    const [scores, setScores] = useState<Score[]>( [] );
    const router = useRouter();
    const [user, setUser] = useState<{ id: string; username: string; image: string; } | null>( null );
    const avatarArray = [
        "/images/astronaut.png",
        "/images/avatar.png",
        "/images/cat.png",
        "/images/chick.png",
        "/images/cool-.png",
        "/images/cool.png",
        "/images/dinosaur.png",
        "/images/dog.png",
        "images/fear.png",
        "/images/girl.png",
        "/images/kitty.png",
        "/images/leonardo.png",
        "/images/man.png",
        "/images/monster.png",
        "/images/panda.png",
        "/images/person (1).png",
        "/images/polar-bear.png",
        "/images/profile.png",
        "/images/superhero.png",
        "/images/swordsman.png",
        "/images/try-me.png",
        "/images/user.png",
        "/images/robot.png",
        "/images/ninja.png",
        "/images/help.png",
        "/images/heart.png",
        "/images/alpine-forget-me-not.png"
    ];

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

    const handleImageClick = async ( imagePath: string ) => {
        if ( !user ) return;

        try {
            const response = await fetch( `/api/users/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { username: user.username, image: imagePath } ),
                credentials: 'include',
            } );

            if ( !response.ok ) {
                throw new Error( 'Failed to update user image' );
            }

            const updatedUser = await response.json();
            setUser( ( prevUser ) => prevUser ? { ...prevUser, image: updatedUser.image } : null );
            window.location.reload();
        } catch ( error ) {
            console.error( 'Error updating user image:', error );
        }
    };

    return (
        <>
            <div className="dashboard-container flex flex-col items-center px-6 py-8 lg:px-8 m-4  rounded-lg shadow-md border hover:shadow-md w-11/12 mx-auto">
                <h2 className="text-4xl font-extrabold mb-5">User Profile</h2>
                <div className="w-full mx-auto">
                    <div className="mt-2 flex flex-col w-1/4 py-5 items-start justify-center">
                        {user && (
                            <img
                                className="h-16 w-16 rounded-full m-3"
                                src={user.image || "/images/user.png"}
                                alt="User profile"
                            />
                        )}
                        <Dialog>
                            <DialogTrigger className='rounded-lg shadow-sm p-1 border hover:shadow-md'>Change Profile Image</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Profile Photos</DialogTitle>
                                    <DialogDescription className='flex flex-wrap'>
                                        {avatarArray.map( ( avatar, index ) => (
                                            <img
                                                key={index}
                                                className="h-16 w-16 rounded-full m-2 cursor-pointer hover:shadow-lg"
                                                src={avatar}
                                                alt={`Avatar ${ index }`}
                                                onClick={() => handleImageClick( avatar )}
                                            />
                                        ) )}
                                        <a href="https://www.flaticon.com/free-icons/astronaut" title="astronaut icons">Avatar icons created by Freepik - Flaticon</a>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
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
