// app/roadmaps/page.tsx

"use client";

import React from 'react';

const RoadmapsPage: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8 text-center">Explore Learning Paths and Roadmaps</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {/* Different Learning Paths Block */}
                <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-300">Explore Different Learning Paths</h2>
                    <p className="text-gray-700 dark:text-gray-400">
                        Embark on various learning paths tailored for different goals, whether you are starting from scratch or looking to advance your skills. Choose a path that fits your learning style and objectives.
                    </p>
                </div>

                {/* Beginner to Expert Progression Block */}
                <div className="bg-green-100 dark:bg-green-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-4 text-green-800 dark:text-green-300">Progress from Beginner to Expert</h2>
                    <p className="text-gray-700 dark:text-gray-400">
                        Follow structured roadmaps that guide you from the basics to advanced concepts, ensuring a gradual and comprehensive understanding of your chosen field.
                    </p>
                </div>

                {/* Cross-Disciplinary Roadmaps Block */}
                <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-4 text-yellow-800 dark:text-yellow-300">Cross-Disciplinary Learning Paths</h2>
                    <p className="text-gray-700 dark:text-gray-400">
                        Combine roadmaps from multiple disciplines to gain a well-rounded knowledge base. Great for learners interested in interconnected fields like tech and business or science and design.
                    </p>
                </div>

                {/* How Roadmaps Can Be Helpful Block */}
                <div className="bg-red-100 dark:bg-red-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-4 text-red-800 dark:text-red-300">Why Roadmaps are Helpful</h2>
                    <p className="text-gray-700 dark:text-gray-400">
                        Roadmaps provide a clear, step-by-step guide to mastering a subject, ensuring that you stay on track and progress efficiently. They help reduce overwhelm by breaking down complex topics into manageable steps.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RoadmapsPage;
