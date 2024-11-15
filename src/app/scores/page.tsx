'use client';

import { Score } from '@/types/interface';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ScoresPage: React.FC = () => {
    const searchParams = useSearchParams();
    const username = searchParams.get( 'username' );
    const [pastScores, setPastScores] = useState<Score[]>( [] );
    const [filteredScores, setFilteredScores] = useState<Score[]>( [] );
    const [filterQuiz, setFilterQuiz] = useState( '' );
    const [loading, setLoading] = useState( true );
    const [error, setError] = useState<string | null>( null );

    useEffect( () => {
        if ( username ) {
            const fetchScoresWithQuizData = async ( id: string ) => {
                try {
                    const response = await fetch( `/api/scores?id=${ id }`,
                        { credentials: 'include' }
                    );
                    const scores: Score[] = await response.json();

                    // Ensure each Score has an associated Quiz with total_questions
                    return scores.map( score => ( {
                        ...score,
                        quiz: {
                            total_questions: score.quiz?.total_questions || 0,
                        }
                    } ) );
                } catch ( error ) {
                    console.error( 'Error fetching scores with quiz data:', error );
                    return [];
                }
            };

            fetchScoresWithQuizData( username );
        } else {
            setError( 'Username is missing.' );
            setLoading( false );
        }
    }, [username] );

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
            <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Past Scores</h1>
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
                        const date = new Date( score.quiz_date );
                        const formattedDate = date.toLocaleDateString();
                        const formattedTime = date.toLocaleTimeString();
                        return (
                            <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="p-4 border-b">{score.quiz_id}</td>
                                <td className="p-4 border-b">{`${ score.score } / ${ score.quiz?.total_questions! }`}</td>
                                <td className="p-4 border-b">{percentage}%</td>
                                <td className="p-4 border-b">{formattedDate}</td>
                                <td className="p-4 border-b">{formattedTime}</td>
                            </tr>
                        );
                    } )}
                </tbody>
            </table>
        </div>
    );
};

export default ScoresPage;
