'use client';

import React, { useEffect, useState } from 'react';
import dotenv, { config } from 'dotenv';
import ScoresPage from '../scores/page';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { MonthSelector } from '@/components/MonthSelector';
import { formatDate } from '@/utils/formatUtils';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Quiz, Score } from '@/backend/models';

dotenv.config();

interface QuizData {
    category: string;
    subject: string;
    total_questions: number;
}

const DashboardPage: React.FC = () => {
    const [scores, setScores] = useState<Score[]>( [] );
    const [quizData, setQuizData] = useState<QuizData[]>( [] );
    const [selectedMonth, setSelectedMonth] = useState<string | null>( null );
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

                    data.forEach( async ( score: Score ) => {
                        const response = await fetch( `/api/quiz/id/${ score.quiz_id }`, {
                            credentials: 'include',
                        } );

                        if ( !response.ok ) {
                            throw new Error( `Failed to fetch quiz data. Status: ${ response.status }` );
                        }

                        const _quizData: Quiz = await response.json();

                        const newQuizData = {
                            id: score.id,
                            quiz_id: score.quiz_id,
                            username: score.username,
                            score: score.score,
                            category: _quizData.category,
                            timelapsed: score.timelapsed,
                            subject: _quizData.subject,
                            total_questions: _quizData.total_questions,
                        };
                        quizData.push( newQuizData );
                    } );

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

    const filteredData = selectedMonth
        ? scores.filter( ( data ) => formatDate( data.updated_at! ).startsWith( `2024-${ selectedMonth }` )
        ) : scores;

    const handleMonthSelect = ( month: string ) => {
        setSelectedMonth( month );
    };

    return (
        <>
            <div className="dashboard-container bg-gray-50 flex flex-col items-center px-6 py-8 lg:px-8 m-4  rounded-lg shadow-md border hover:shadow-md w-11/12 mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">User Profile</h2>
                <div className="w-full mx-auto">
                    <div className="mt-2 flex flex-col w-1/4 py-5 items-start justify-center">
                        {user && (
                            <>
                                <img
                                    className="h-16 w-16 rounded-full m-3"
                                    src={user.image || "/images/user.png"}
                                    alt="User profile"
                                />
                                <div className="profile-info space-y-4 mb-3">
                                    <p>ID: {user.id || 'N/A'}</p>
                                    <p>Username: {user.username || 'N/A'}</p>
                                </div>
                            </>
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
            </div>
            <div className='w-full mx-auto bg-gray-50'>
                {user ? (
                    <>
                        <div className="flex flex-col gap-7 ">
                            <div className="flex flex-col justify-center items-center dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl m-4 shadow-md border hover:shadow-md p-7 w-11/12 mx-auto">
                                <div className="w-full">
                                    <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Progress Tracking and Analytics</h2>
                                    <p className="text-lg mb-4">
                                        Use the dropdown below to select a month and view your quiz progress.
                                    </p>
                                    <MonthSelector onMonthSelect={handleMonthSelect} />
                                    <div className="mt-8 w-full">
                                        <h5 className="text-2xl font-semibold mt-2">
                                            {selectedMonth ? `Progress for ${ selectedMonth }` : 'Overall Progress'}
                                        </h5>
                                        <div className="w-full h-80 ">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={filteredData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="quizName" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="totalQuestions" fill="#8884d8" name="Total Questions" />
                                                    <Bar dataKey="correctAnswers" fill="#82ca9d" name="Correct Answers" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Loading user information...</p>
                )}
            </div>
            {scores.length > 0 ? <ScoresPage /> : <></>}
        </>
    );
};

export default DashboardPage;
