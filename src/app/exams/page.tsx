// app/exams/page.tsx

"use client";

import React from 'react';

const ExamPage: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8 text-center">Explore Our Exam Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {/* Beginner Tests Block */}
                <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-300">Beginner Tests</h2>
                    <p className="text-gray-700 dark:text-gray-400">
                        Start your learning journey with our beginner-friendly tests. These tests are designed to help you build foundational knowledge and grow your confidence.
                    </p>
                </div>

                {/* Expert Tests Block */}
                <div className="bg-green-100 dark:bg-green-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-4 text-green-800 dark:text-green-300">Expert Tests</h2>
                    <p className="text-gray-700 dark:text-gray-400">
                        Challenge yourself with our expert-level tests. Perfect for those who want to push their skills to the limit and test their advanced knowledge.
                    </p>
                </div>

                {/* Multiple Subject Tests Block */}
                <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-4 text-yellow-800 dark:text-yellow-300">Multiple Subject Tests</h2>
                    <p className="text-gray-700 dark:text-gray-400">
                        Prepare for comprehensive assessments with our multi-subject tests. Test your knowledge across a range of topics in one go.
                    </p>
                </div>

                {/* Timed Tests Block */}
                <div className="bg-red-100 dark:bg-red-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-4 text-red-800 dark:text-red-300">Timed Tests</h2>
                    <p className="text-gray-700 dark:text-gray-400">
                        Take on the challenge of our timed tests to improve your speed and accuracy under time constraints.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ExamPage;
