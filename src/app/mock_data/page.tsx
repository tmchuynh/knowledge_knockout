"use client";

import React, { useState } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockQuizData } from './data';
import { MonthSelector } from '@/components/MonthSelector';

const Page: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<string | null>( null );

    const filteredData = selectedMonth
        ? mockQuizData.filter( ( data ) => data.date.startsWith( `2024-${ selectedMonth }` ) )
        : mockQuizData;

    const handleMonthSelect = ( month: string ) => {
        setSelectedMonth( month );
    };

    return (
        <div className="flex flex-col gap-7">
            <div className="flex flex-col justify-center items-center dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl m-4 shadow-md border hover:shadow-md p-7 w-11/12 mx-auto">
                <div className="w-full">
                    <h1 className="text-4xl font-extrabold text-stone text-center mb-5">Progress Tracking and Analytics</h1>
                    <p className="text-lg mb-4">
                        Use the dropdown below to select a month and view your quiz progress.
                    </p>
                    <MonthSelector onMonthSelect={handleMonthSelect} />
                    <div className="mt-8 w-full">
                        <h5 className="text-2xl font-semibold mt-2">
                            {selectedMonth ? `Progress for ${ selectedMonth }` : 'Overall Progress'}
                        </h5>
                        <div className="w-full h-80">
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
    );
};

export default Page;
