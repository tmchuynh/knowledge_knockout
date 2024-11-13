"use client";

import React, { useState } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MonthSelector } from '../../components/MonthSelector';
import ContributionHeatmap from '../../components/ContributionHeatmap';
import { mockQuizData } from './data';

const Page: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<string | null>( null );

    const filteredData = selectedMonth
        ? mockQuizData.filter( ( data ) => data.date.startsWith( `2024-${ selectedMonth }` ) )
        : mockQuizData;

    const handleMonthSelect = ( month: string ) => {
        setSelectedMonth( month );
    };

    return (
        <div className="flex flex-col min-h-screen justify-center items-center dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full">
            <div>

                <h1 className="text-3xl font-bold mb-6">Progress Tracking and Analytics</h1>
                <p className="text-lg mb-4">
                    Use the dropdown below to select a month and view your quiz progress.
                </p>
                <MonthSelector onMonthSelect={handleMonthSelect} />
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">
                        {selectedMonth ? `Progress for ${ selectedMonth }` : 'Overall Progress'}
                    </h2>
                    <BarChart width={800} height={400} data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="quizName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalQuestions" fill="#8884d8" name="Total Questions" />
                        <Bar dataKey="correctAnswers" fill="#82ca9d" name="Correct Answers" />
                    </BarChart>
                </div>
            </div>

            <div className='flex flex-col text-center py-8'>
                <h2 className="text-2xl font-semibold mb-4">Your Contributions Over Time</h2>
                <ContributionHeatmap />
            </div>
        </div>
    );
};

export default Page;
