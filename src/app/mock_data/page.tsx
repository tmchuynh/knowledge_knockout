"use client";

import React, { useState } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MonthSelector } from '../components/MonthSelector';
import ContributionsHeatmap from '../components/ContributionHeatmap';

interface QuizData {
    category: string;
    quizName: string;
    correctAnswers: number;
    totalQuestions: number;
    date: string;
}

const mockQuizData: QuizData[] = [
    { category: 'Science', quizName: 'Biology', correctAnswers: 8, totalQuestions: 10, date: '2024-01-15' },
    { category: 'Math', quizName: 'Algebra', correctAnswers: 18, totalQuestions: 20, date: '2024-01-25' },
    { category: 'Science', quizName: 'Chemistry', correctAnswers: 16, totalQuestions: 20, date: '2024-02-02' },
    { category: 'Math', quizName: 'Geometry', correctAnswers: 10, totalQuestions: 15, date: '2024-02-10' },
    { category: 'Science', quizName: 'Physics', correctAnswers: 12, totalQuestions: 15, date: '2024-03-05' },
    { category: 'Programming', quizName: 'Java Basics', correctAnswers: 15, totalQuestions: 20, date: '2024-01-20' },
    { category: 'Humanities', quizName: 'English Literature', correctAnswers: 12, totalQuestions: 15, date: '2024-02-05' },
    { category: 'Law', quizName: 'Constitutional Law', correctAnswers: 18, totalQuestions: 20, date: '2024-03-15' },
    { category: 'Science', quizName: 'Chemistry', correctAnswers: 12, totalQuestions: 15, date: '2024-04-02' },
    { category: 'Programming', quizName: 'Python Advanced', correctAnswers: 16, totalQuestions: 20, date: '2024-03-10' },
    { category: 'Math', quizName: 'Calculus', correctAnswers: 18, totalQuestions: 20, date: '2024-03-20' },
    { category: 'Humanities', quizName: 'World History', correctAnswers: 12, totalQuestions: 15, date: '2024-04-02' },
    { category: 'Science', quizName: 'Biochemistry', correctAnswers: 12, totalQuestions: 15, date: '2024-04-10' },
    { category: 'Law', quizName: 'Constitutional Law', correctAnswers: 10, totalQuestions: 12, date: '2024-02-12' },
    { category: 'Science', quizName: 'Physics', correctAnswers: 10, totalQuestions: 12, date: '2024-03-02' },
    { category: 'Programming', quizName: 'Python Basics', correctAnswers: 17, totalQuestions: 20, date: '2024-03-10' },
    { category: 'Science', quizName: 'Chemistry', correctAnswers: 9, totalQuestions: 10, date: '2024-03-01' },
    { category: 'Programming', quizName: 'Python Advanced', correctAnswers: 14, totalQuestions: 18, date: '2024-03-10' },
    { category: 'Math', quizName: 'Calculus', correctAnswers: 20, totalQuestions: 25, date: '2024-03-20' },
    { category: 'Humanities', quizName: 'Literature', correctAnswers: 18, totalQuestions: 20, date: '2024-04-02' },
    { category: 'Law', quizName: 'Civil Rights', correctAnswers: 15, totalQuestions: 18, date: '2024-04-10' },
    { category: 'Science', quizName: 'Physics', correctAnswers: 18, totalQuestions: 20, date: '2024-04-07' },
    { category: 'Programming', quizName: 'JavaScript Essentials', correctAnswers: 10, totalQuestions: 15, date: '2024-04-15' },
    { category: 'Humanities', quizName: 'World History', correctAnswers: 16, totalQuestions: 20, date: '2024-05-10' },
    { category: 'Science', quizName: 'Biochemistry', correctAnswers: 14, totalQuestions: 16, date: '2024-05-20' },
    { category: 'Programming', quizName: 'C++ Basics', correctAnswers: 13, totalQuestions: 15, date: '2024-05-01' },
    { category: 'Math', quizName: 'Statistics', correctAnswers: 17, totalQuestions: 20, date: '2024-05-18' },
    { category: 'Science', quizName: 'Geology', correctAnswers: 12, totalQuestions: 15, date: '2024-06-25' },
    { category: 'Programming', quizName: 'Java Basics', correctAnswers: 18, totalQuestions: 20, date: '2024-07-01' },
    { category: 'Humanities', quizName: 'Art History', correctAnswers: 15, totalQuestions: 20, date: '2024-07-15' },
    { category: 'Science', quizName: 'Astronomy', correctAnswers: 10, totalQuestions: 12, date: '2024-08-01' },
    { category: 'Programming', quizName: 'Python Intermediate', correctAnswers: 12, totalQuestions: 15, date: '2024-08-15' },
    { category: 'Humanities', quizName: 'Philosophy', correctAnswers: 18, totalQuestions: 20, date: '2024-09-01' },
    { category: 'Science', quizName: 'Chemistry', correctAnswers: 11, totalQuestions: 12, date: '2024-08-05' },
    { category: 'Programming', quizName: 'C++ Intermediate', correctAnswers: 16, totalQuestions: 20, date: '2024-08-20' },
    { category: 'Humanities', quizName: 'Philosophy', correctAnswers: 10, totalQuestions: 12, date: '2024-07-05' },
    { category: 'Law', quizName: 'International Law', correctAnswers: 15, totalQuestions: 15, date: '2024-07-15' },
    { category: 'Science', quizName: 'Ecology', correctAnswers: 8, totalQuestions: 10, date: '2024-08-10' },
    { category: 'Programming', quizName: 'Machine Learning', correctAnswers: 19, totalQuestions: 20, date: '2024-08-25' },
    { category: 'Math', quizName: 'Calculus', correctAnswers: 17, totalQuestions: 20, date: '2024-09-10' },
    { category: 'Science', quizName: 'Physics', correctAnswers: 19, totalQuestions: 20, date: '2024-06-25' },
    { category: 'Math', quizName: 'Linear Algebra', correctAnswers: 15, totalQuestions: 18, date: '2024-06-05' },
    { category: 'Science', quizName: 'Genetics', correctAnswers: 13, totalQuestions: 15, date: '2024-09-20' },
    { category: 'Programming', quizName: 'React Basics', correctAnswers: 20, totalQuestions: 20, date: '2024-10-01' },
    { category: 'Humanities', quizName: 'Ancient Civilizations', correctAnswers: 12, totalQuestions: 15, date: '2024-10-15' },
    { category: 'Science', quizName: 'Environmental Science', correctAnswers: 17, totalQuestions: 20, date: '2024-10-25' },
    { category: 'Math', quizName: 'Statistics', correctAnswers: 12, totalQuestions: 15, date: '2024-11-05' },
    { category: 'Science', quizName: 'Chemistry', correctAnswers: 18, totalQuestions: 20, date: '2024-11-15' },
    { category: 'Programming', quizName: 'Node.js Basics', correctAnswers: 15, totalQuestions: 20, date: '2024-11-25' },
    { category: 'Math', quizName: 'Geometry', correctAnswers: 11, totalQuestions: 14, date: '2024-07-15' },
    { category: 'Science', quizName: 'Biology', correctAnswers: 16, totalQuestions: 20, date: '2024-12-25' },
    { category: 'Math', quizName: 'Algebra', correctAnswers: 13, totalQuestions: 16, date: '2024-01-05' },
    { category: 'Science', quizName: 'Physics', correctAnswers: 17, totalQuestions: 20, date: '2024-01-15' },
    { category: 'Law', quizName: 'Corporate Law', correctAnswers: 11, totalQuestions: 12, date: '2024-11-10' },
    { category: 'Science', quizName: 'Neuroscience', correctAnswers: 16, totalQuestions: 20, date: '2024-11-22' },
    { category: 'Math', quizName: 'Calculus', correctAnswers: 19, totalQuestions: 20, date: '2024-06-01' },
    { category: 'Science', quizName: 'Physics', correctAnswers: 12, totalQuestions: 15, date: '2024-06-10' },
    { category: 'Law', quizName: 'Criminal Law', correctAnswers: 15, totalQuestions: 18, date: '2024-06-20' },
    { category: 'Science', quizName: 'Chemistry', correctAnswers: 19, totalQuestions: 20, date: '2024-12-25' },
    { category: 'Math', quizName: 'Calculus', correctAnswers: 13, totalQuestions: 16, date: '2024-10-20' },
    { category: 'Science', quizName: 'Physics', correctAnswers: 18, totalQuestions: 20, date: '2024-10-25' },
    { category: 'Law', quizName: 'Criminal Law', correctAnswers: 17, totalQuestions: 18, date: '2024-12-15' },
    { category: 'Science', quizName: 'Chemistry', correctAnswers: 16, totalQuestions: 20, date: '2024-09-20' },
    { category: 'Math', quizName: 'Calculus', correctAnswers: 12, totalQuestions: 15, date: '2024-09-25' },
    { category: 'Science', quizName: 'Physics', correctAnswers: 15, totalQuestions: 20, date: '2024-12-05' },
    { category: 'Law', quizName: 'Criminal Law', correctAnswers: 13, totalQuestions: 18, date: '2024-02-25' },
    { category: 'Science', quizName: 'Chemistry', correctAnswers: 15, totalQuestions: 20, date: '2024-05-05' },
    { category: 'Math', quizName: 'Number Theory', correctAnswers: 14, totalQuestions: 16, date: '2024-02-05' },
];

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
                <ContributionsHeatmap />
            </div>
        </div>
    );
};

export default Page;
