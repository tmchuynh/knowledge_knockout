"use client";
import { Score } from '@/types';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ScoresPage: React.FC = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get( 'id' );
    const [pastScores, setPastScores] = useState<Score[]>( [] );
    const [filteredScores, setFilteredScores] = useState<Score[]>( [] );
    const [filterQuiz, setFilterQuiz] = useState( '' );
    const [selectedDates, setSelectedDates] = useState<Date[]>( [] );

    useEffect( () => {
        if ( id ) {
            const userScoresKey = `quizScores_${ id }`;
            const scores = JSON.parse( localStorage.getItem( userScoresKey ) || '[]' );
            setPastScores( scores );
            setFilteredScores( scores );
        }
    }, [id] );

    // Sort scores by quiz name
    const sortByQuiz = () => {
        const sorted = [...filteredScores].sort( ( a, b ) => a.quiz_id.localeCompare( b.quiz_id ) );
        setFilteredScores( sorted );
    };

    // Sort scores by date
    const sortByDate = () => {
        const sorted = [...filteredScores].sort( ( a, b ) => new Date( b.quiz_date ).getTime() - new Date( a.quiz_date ).getTime() );
        setFilteredScores( sorted );
    };

    // Sort scores by percentage
    const sortByScore = () => {
        const sorted = [...filteredScores].sort( ( a, b ) => ( b.score / b.total_questions ) * 100 - ( a.score / a.total_questions ) * 100 );
        setFilteredScores( sorted );
    };

    // Filter scores by selected quiz
    const handleFilterQuizChange = ( event: React.ChangeEvent<HTMLSelectElement> ) => {
        const selectedQuiz = event.target.value;
        setFilterQuiz( selectedQuiz );

        if ( selectedQuiz ) {
            setFilteredScores( pastScores.filter( score => score.quiz_id === selectedQuiz ) );
        } else {
            setFilteredScores( pastScores );
        }
    };

    // Filter scores by selected date range
    const applyDateFilter = () => {
        if ( selectedDates.length === 2 ) {
            const [startDate, endDate] = selectedDates;
            setFilteredScores(
                pastScores.filter( score => {
                    const scoreDate = new Date( score.quiz_date );
                    return scoreDate >= startDate && scoreDate <= endDate;
                } )
            );
        }
    };

    const clearFilters = () => {
        setFilteredScores( pastScores );
        setFilterQuiz( '' );
        setSelectedDates( [] );
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8">Past Scores</h1>
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
                    {[...new Set( pastScores.map( score => score.quiz_id ) )].map( quizName => (
                        <option key={quizName} value={quizName}>{quizName}</option>
                    ) )}
                </select>
                <button onClick={clearFilters} className="btn-danger">Clear Filters</button>
            </div>

            <table className="w-full table-fixed bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md shadow-lg">
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
                        const percentage = ( ( score.score / score.total_questions ) * 100 ).toFixed( 2 );
                        const date = new Date( score.quiz_date );
                        const formattedDate = date.toLocaleDateString();
                        const formattedTime = date.toLocaleTimeString();
                        return (
                            <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="p-4 border-b">{score.quiz_id}</td>
                                <td className="p-4 border-b">{`${ score.score } / ${ score.total_questions }`}</td>
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
