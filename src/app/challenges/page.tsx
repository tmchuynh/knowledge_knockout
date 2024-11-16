'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Challenge } from '@/types/interface';

const ChallengesPage: React.FC = () => {
    const [dailyChallenges, setDailyChallenges] = useState<Challenge[]>( [] );
    const [weeklyChallenges, setWeeklyChallenges] = useState<Challenge[]>( [] );
    const [biWeeklyChallenges, setBiWeeklyChallenges] = useState<Challenge[]>( [] );
    const [monthlyChallenges, setMonthlyChallenges] = useState<Challenge[]>( [] );
    const [biMonthlyChallenges, setBiMonthlyChallenges] = useState<Challenge[]>( [] );
    const [yearlyChallenges, setYearlyChallenges] = useState<Challenge[]>( [] );
    const [loading, setLoading] = useState<boolean>( true );
    const [error, setError] = useState<string | null>( null );

    useEffect( () => {
        const fetchChallenges = async () => {
            try {
                const response = await fetch( '/api/challenges', {
                    credentials: 'include',
                } );

                if ( !response.ok ) {
                    throw new Error( `Failed to fetch challenges. Status: ${ response.status }` );
                }

                const data: Challenge[] = await response.json();
                console.log( data );

                setDailyChallenges( filterChallenges( data, 'daily' ) );
                setWeeklyChallenges( filterChallenges( data, 'weekly' ) );
                setBiWeeklyChallenges( filterChallenges( data, 'bi-weekly' ) );
                setMonthlyChallenges( filterChallenges( data, 'monthly' ) );
                setBiMonthlyChallenges( filterChallenges( data, 'bi-monthly' ) );
                setYearlyChallenges( filterChallenges( data, 'yearly' ) );
            } catch ( error ) {
                console.error( 'Error fetching challenges:', error );
                setError( 'Failed to load challenges. Please try again later.' );
            } finally {
                setLoading( false );
            }
        };

        fetchChallenges();
    }, [] );

    const filterChallenges = (
        challenges: Challenge[],
        type: 'daily' | 'weekly' | 'bi-weekly' | 'monthly' | 'bi-monthly' | 'yearly'
    ) => {
        return challenges.filter( ( challenge ) => challenge.type === type );
    };

    if ( loading ) return <div>Loading...</div>;
    if ( error ) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-extrabold text-stone text-center mb-5">Challenges</h1>
            <section className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Daily Challenges</h3>
                {dailyChallenges.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dailyChallenges.map( ( challenge, index ) => (
                            <div key={index} className="p-4 border rounded-lg shadow-md flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                                    <p className="mb-4">{challenge.description}</p>
                                </div>
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white">Start Challenge</Button>
                            </div>
                        ) )}
                    </div>
                ) : (
                    <p>No daily challenges available.</p>
                )}
            </section>
            <section className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Weekly Challenges</h3>
                {weeklyChallenges.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {weeklyChallenges.map( ( challenge, index ) => (
                            <div key={index} className="p-4 border rounded-lg shadow-md flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                                    <p className="mb-4">{challenge.description}</p>
                                </div>
                                <Button className="bg-green-500 hover:bg-green-600 text-white">Start Challenge</Button>
                            </div>
                        ) )}
                    </div>
                ) : (
                    <p>No weekly challenges available.</p>
                )}
            </section>
            <section className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Bi-Weekly Challenges</h3>
                {biWeeklyChallenges.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {biWeeklyChallenges.map( ( challenge, index ) => (
                            <div key={index} className="p-4 border rounded-lg shadow-md flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                                    <p className="mb-4">{challenge.description}</p>
                                </div>
                                <Button className="bg-teal-500 hover:bg-teal-600 text-white">Start Challenge</Button>
                            </div>
                        ) )}
                    </div>
                ) : (
                    <p>No bi-weekly challenges available.</p>
                )}
            </section>
            <section className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Monthly Challenges</h3>
                {monthlyChallenges.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {monthlyChallenges.map( ( challenge, index ) => (
                            <div key={index} className="p-4 border rounded-lg shadow-md flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                                    <p className="mb-4">{challenge.description}</p>
                                </div>
                                <Button className="bg-purple-500 hover:bg-purple-600 text-white">Start Challenge</Button>
                            </div>
                        ) )}
                    </div>
                ) : (
                    <p>No monthly challenges available.</p>
                )}
            </section>
            <section className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Bi-Monthly Challenges</h3>
                {biMonthlyChallenges.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {biMonthlyChallenges.map( ( challenge, index ) => (
                            <div key={index} className="p-4 border rounded-lg shadow-md flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                                    <p className="mb-4">{challenge.description}</p>
                                </div>
                                <Button className="bg-pink-500 hover:bg-pink-600 text-white">Start Challenge</Button>
                            </div>
                        ) )}
                    </div>
                ) : (
                    <p>No bi-monthly challenges available.</p>
                )}
            </section>
            <section className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Yearly Challenges</h3>
                {yearlyChallenges.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {yearlyChallenges.map( ( challenge, index ) => (
                            <div key={index} className="p-4 border rounded-lg shadow-md flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                                    <p className="mb-4">{challenge.description}</p>
                                </div>
                                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">Start Challenge</Button>
                            </div>
                        ) )}
                    </div>
                ) : (
                    <p>No yearly challenges available.</p>
                )}
            </section>
        </div>
    );
};

export default ChallengesPage;
