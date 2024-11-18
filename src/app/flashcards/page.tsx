// app/flashcards/page.tsx

"use client";

import React from 'react';

const FlashcardsPage: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8 text-center">Explore Flashcard Study Options</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {/* Entire Subject Category Block */}
                <div className="bg-indigo-100 dark:bg-indigo-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-4 text-indigo-800 dark:text-indigo-300">Study Entire Subject Categories</h2>
                    <p className="text-gray-700 dark:text-gray-400">
                        Deepen your understanding by studying all flashcards from an entire subject category. Perfect for mastering broader topics in a structured way.
                    </p>
                </div>

                {/* Specific Subject Block */}
                <div className="bg-teal-100 dark:bg-teal-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-4 text-teal-800 dark:text-teal-300">Study from a Specific Subject</h2>
                    <p className="text-gray-700 dark:text-gray-400">
                        Focus your learning by selecting flashcards from a specific subject and tailor your study session to your needs.
                    </p>
                </div>

                {/* Specific Level Block */}
                <div className="bg-purple-100 dark:bg-purple-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-4 text-purple-800 dark:text-purple-300">Study from a Specific Level</h2>
                    <p className="text-gray-700 dark:text-gray-400">
                        Enhance your skills at any stage by studying flashcards from a specific level, whether beginner, intermediate, or expert.
                    </p>
                </div>

                {/* Different Levels from Different Subjects Block */}
                <div className="bg-orange-100 dark:bg-orange-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-4 text-orange-800 dark:text-orange-300">Choose Different Levels from Different Subjects</h2>
                    <p className="text-gray-700 dark:text-gray-400">
                        Customize your study path by mixing different levels from various subjects and categories for a comprehensive learning experience.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FlashcardsPage;
