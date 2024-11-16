'use client';

import { Quiz, Score, User } from '@/types/interface';
import { formatDate, formatTime } from '@/utils/formatUtils';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ScoresPage: React.FC = () => {
    const searchParams = useSearchParams();
    const [pastScores, setPastScores] = useState<Score[]>( [] );
    const [filteredScores, setFilteredScores] = useState<Score[]>( [] );
    const [filterQuiz, setFilterQuiz] = useState( '' );
    const [loading, setLoading] = useState( true );
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string | null>( null );

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
                fetchScoresWithQuizData( data.username );
            } catch ( error ) {
                console.error( 'Failed to fetch user data:', error );
            }
        };

        const fetchQuiz = async ( quizId: string ) => {
            try {
                const response = await fetch( `/api/quiz/id/${ quizId }`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                } );

                if ( !response.ok ) {
                    throw new Error( `Failed to fetch quiz subject. Status: ${ response.status }` );
                }

                const data = await response.json();
                console.log( 'Quiz:', data );
                return data.quiz;
            } catch ( error ) {
                console.error( 'Error fetching quiz subject:', error );
                throw error;
            }
        };

        const fetchScoresWithQuizData = async ( username: string ) => {
            try {
                const response = await fetch( `/api/score/username/${ username }`,
                    { credentials: 'include' }
                );
                const scores: Score[] = await response.json();

                console.log( "SCORES", scores );
                scores.forEach( async score => {
                    const quiz: Quiz = await fetchQuiz( score.quiz_id );
                    score.quiz = quiz;
                } );

                console.log( "scores updated", scores );
                setPastScores( scores );
                setFilteredScores( scores );
                setLoading( false );
            } catch ( error ) {
                console.error( 'Error fetching scores with quiz data:', error );
                return [];
            }
        };

        fetchUserFromJWT();
    }, [] );

    const sortByQuiz = () => {
        const sorted = [...filteredScores].sort( ( a, b ) => a.quiz_id.localeCompare( b.quiz_id ) );
        setFilteredScores( sorted );
    };

    const sortByDate = () => {
        const sorted = [...filteredScores].sort(
            ( a, b ) => new Date( b.quiz_date ).getTime() - new Date( a.quiz_date ).getTime()
        );
        setFilteredScores( sorted );
    };

    const sortByScore = () => {
        const sorted = [...filteredScores].sort( ( a, b ) => {
            const aTotalQuestions = a.quiz?.total_questions || 1; // Fallback to 1 to avoid division by zero
            const bTotalQuestions = b.quiz?.total_questions || 1;

            return ( ( b.score / bTotalQuestions ) * 100 ) - ( ( a.score / aTotalQuestions ) * 100 );
        } );
        setFilteredScores( sorted );
    };


    const handleFilterQuizChange = ( event: React.ChangeEvent<HTMLSelectElement> ) => {
        const selectedQuiz = event.target.value;
        setFilterQuiz( selectedQuiz );

        if ( selectedQuiz ) {
            setFilteredScores( pastScores.filter( score => score.quiz_id === selectedQuiz ) );
        } else {
            setFilteredScores( pastScores );
        }
    };

    const clearFilters = () => {
        setFilteredScores( pastScores );
        setFilterQuiz( '' );
    };

    if ( loading ) {
        return <p className="text-center">Loading...</p>;
    }

    if ( error ) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-md border hover:shadow-md w-11/12">
            <h1 className="text-4xl font-extrabold text-stone text-center mb-5">Past Scores</h1>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
                <button onClick={sortByQuiz} className="btn-primary">Sort by Quiz</button>
                <button onClick={sortByDate} className="btn-primary">Sort by Date</button>
                <button onClick={sortByScore} className="btn-primary">Sort by Score</button>
                <select
                    value={filterQuiz}
                    onChange={handleFilterQuizChange}
                    className="btn-secondary"
                >
                    <option value="">Filter by Quiz</option>
                    {[...new Set( pastScores.map( score => score.quiz_id ) )].map( ( quizName, index ) => (
                        <option key={`${ quizName }__${ index }`} value={quizName}>{quizName}</option>
                    ) )}
                </select>
                <button onClick={clearFilters} className="btn-danger">Clear Filters</button>
            </div>

            <table className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-lg">
                <thead>
                    <tr>
                        <th className="p-4 border-b">Quiz</th>
                        <th className="p-4 border-b">Score</th>
                        <th className="p-4 border-b">Percentage</th>
                        <th className="p-4 border-b">Date</th>
                        <th className="p-4 border-b">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredScores.map( ( score, index ) => {
                        const percentage = ( ( score.score / score.quiz?.total_questions! ) * 100 ).toFixed( 2 );
                        const date = score.updated_at!;
                        const subject = score.quiz?.subject;
                        const total_questions = score.quiz?.total_questions;

                        return (
                            <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="p-4 border-b">{subject}</td>
                                <td className="p-4 border-b">{`${ score.score } / ${ total_questions }`}</td>
                                <td className="p-4 border-b">{percentage}%</td>
                                <td className="p-4 border-b">{formatDate( date )}</td>
                                <td className="p-4 border-b">{formatTime( date )}</td>
                            </tr>
                        );
                    } )}
                </tbody>
            </table>
        </div>
    );
};

export default ScoresPage;
