"use client";

import React from 'react';
import {
    Flame,
    Lightbulb,
    CircuitBoard,
    Database,
    Magnet,
    Sigma,
    Crown,
} from 'lucide-react';
import AnimatedCircularProgressBar from './components/ui/animated-circular-progress-bar';
import { useRouter } from 'next/navigation';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
const WelcomePage = () => {
    const router = useRouter();

    // General navigation function
    const handleNavigation = ( path: string ) => {
        router.push( path );
    };

    return (
        <div className="flex flex-col min-h-screen justify-center items-center dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full">
            <header className="py-6">
                <div className="container px-6 text-center">
                    <h1 className="text-5xl font-extrabold text-stone text-center">
                        Welcome to Your Learning Journey
                    </h1>
                    <p className="mt-4 text-lg text-indigo-700">
                        Embrace the power of repetition for mastery and growth.
                    </p>
                </div>
            </header>

            <main className="container grid grid-cols-1 gap-7 space-y-6">
                <section>
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-semibold text-indigo-900">
                            Quizzes and Flashcards
                        </h2>
                        <p className="text-lg text-gray-800 mt-4">
                            Your path to smarter learning and steady progress.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-6">
                        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
                                <span className="mr-2">🧠</span> Enhanced Memory
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Repetition strengthens neural connections, making information easier to recall and apply. Each review activates the same pathways, embedding knowledge more deeply into long-term memory and allowing for quicker, more confident retrieval over time.
                            </p>
                            <button
                                onClick={() => handleNavigation( '/memory-techniques' )}
                                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                            >
                                Learn Memory Techniques
                            </button>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold text-teal-700 mb-4 flex items-center">
                                <span className="mr-2">💪</span> Confidence Boost
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Repetition fosters familiarity, which in turn builds confidence and reduces stress during tests and practical applications. By reinforcing material through repeated exposure, you become more comfortable with the content, leading to a more assured and composed approach when it matters most.
                            </p>
                            <button
                                onClick={() => handleNavigation( '/confidence-boost' )}
                                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
                            >
                                Boost Your Confidence
                            </button>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center">
                                <span className="mr-2">📚</span> Retention & Mastery
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Learning through repetition cultivates a deep-rooted understanding, enabling you to master complex topics with greater ease. Repeated exposure reinforces foundational knowledge, providing a solid base for tackling more advanced concepts confidently and effectively.
                            </p>
                            <button
                                onClick={() => handleNavigation( '/master-topics' )}
                                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                            >
                                Master Complex Topics
                            </button>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                                <span className="mr-2">📈</span> Structured Growth
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Consistent review and practice establish a structured path toward continuous improvement. This steady reinforcement helps solidify knowledge, enhances skills over time, and fosters progressive mastery, enabling sustained growth and development.
                            </p>
                            <button
                                onClick={() => handleNavigation( '/track-progress' )}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                            >
                                Track Your Progress
                            </button>
                        </div>
                    </div>
                </section>

                <section className="mb-10 p-6">
                    <h2 className="text-4xl font-semibold text-stone-800 mb-6">
                        Why Repetitive Learning?
                    </h2>
                    <p className="text-lg text-gray-700">
                        Repetitive learning plays a crucial role in reinforcing concepts, enhancing memory retention, and building confidence over time. When students repeatedly engage with material, they strengthen the neural pathways associated with that knowledge, making it easier to recall and apply in various contexts. This practice not only deepens understanding but also helps learners identify and fill any knowledge gaps.
                        <br />
                        <br />
                        By revisiting key topics at regular intervals, learners move beyond superficial familiarity to achieve true mastery. This method encourages long-term retention, allowing students to build on their foundational knowledge as new, more complex concepts are introduced. Repetition also promotes greater confidence, as students become more assured in their grasp of the material through repeated exposure and practice.
                        <br />
                        <br />
                        Moreover, this approach supports the concept of spaced repetition, a learning technique that involves reviewing content at strategically timed intervals to optimize memory consolidation. By structuring learning sessions in this way, students reinforce their comprehension in a manner that promotes both short-term and long-term retention.
                        <br />
                        <br />
                        Ultimately, incorporating repetitive learning into educational strategies empowers students to achieve a deeper, more durable understanding of their subjects, enabling them to approach future challenges with confidence and competence.
                    </p>
                </section>

                <section>
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-semibold text-teal-800">
                            Gamification Elements
                        </h2>
                        <p className="text-lg text-gray-800 mt-4">
                            Make learning fun and engaging with gamified elements.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-6">
                        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold text-green-700 mb-4">Badges and Rewards</h3>
                            <p className="text-gray-600 mb-4">
                                Earn badges as you complete quizzes and reach milestones. Consistent studying is rewarded, motivating you to keep progressing.
                            </p>
                            <TooltipProvider>
                                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-4 px-6">
                                    <li className="flex flex-col items-center">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="p-2 rounded-full bg-emerald-100 w-14 h-14 flex justify-center items-center">
                                                    <Lightbulb className="w-8 h-8 text-teal-700" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className='bg-teal-400 text-white p-1 rounded-md'>
                                                Bright Ideas
                                            </TooltipContent>
                                        </Tooltip>
                                    </li>
                                    <li className="flex flex-col items-center">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="p-2 rounded-full bg-emerald-100 w-14 h-14 flex justify-center items-center">
                                                    <CircuitBoard className="w-8 h-8 text-teal-700" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className='bg-teal-400 text-white p-1 rounded-md'>
                                                Tech & Hardware Mastery
                                            </TooltipContent>
                                        </Tooltip>
                                    </li>
                                    <li className="flex flex-col items-center">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="p-2 rounded-full bg-emerald-100 w-14 h-14 flex justify-center items-center">
                                                    <Database className="w-8 h-8 text-teal-700" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className='bg-teal-400 text-white p-1 rounded-md'>
                                                Database Expertise
                                            </TooltipContent>
                                        </Tooltip>
                                    </li>
                                    <li className="flex flex-col items-center">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="p-2 rounded-full bg-emerald-100 w-14 h-14 flex justify-center items-center">
                                                    <Sigma className="w-8 h-8 text-teal-700" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className='bg-teal-400 text-white p-1 rounded-md'>
                                                Math Genius
                                            </TooltipContent>
                                        </Tooltip>
                                    </li>
                                    <li className="flex flex-col items-center">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="p-2 rounded-full bg-emerald-100 w-14 h-14 flex justify-center items-center">
                                                    <Crown className="w-8 h-8 text-teal-700" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className='bg-teal-400 text-white p-1 rounded-md'>
                                                Royal Achiever
                                            </TooltipContent>
                                        </Tooltip>
                                    </li>
                                    <li className="flex flex-col items-center">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="p-2 rounded-full bg-emerald-100 w-14 h-14 flex justify-center items-center">
                                                    <Magnet className="w-8 h-8 text-teal-700" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className='bg-teal-400 text-white p-1 rounded-md'>
                                                Magnetic Personality
                                            </TooltipContent>
                                        </Tooltip>
                                    </li>
                                </ul>
                            </TooltipProvider>
                            <button
                                onClick={() => handleNavigation( '/badges' )}
                                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 transition-colors duration-300">
                                View All Badges
                            </button>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold text-rose-700 mb-4">Challenge Yourself</h3>
                            <p className="text-gray-600 mb-4">
                                Participate in challenges that push your limits and unlock exclusive rewards. Stay engaged and build competitive spirit.
                            </p>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="p-2 bg-rose-100 rounded-full w-14 h-14 flex justify-center items-center">
                                    <Flame className="text-rose-700 w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-rose-700 font-semibold">Weekly Challenge</h4>
                                    <p className="text-gray-500 text-sm">Commit to a month-long challenge and see your progress soar.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleNavigation( '/monthly-challenge' )}
                                className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-300">
                                Join a Challenge
                            </button>
                        </div>
                    </div>
                </section >

                <section>
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-semibold text-fuchsia-900">
                            Progress Tracking and Analytics
                        </h2>
                        <p className="text-lg text-gray-800 mt-4">
                            Stay informed about your learning progress and optimize your study plan.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold text-fuchsia-700 mb-4">Detailed Insights</h3>
                            <p className="text-gray-600 mb-4">
                                Track your study habits with insights like time spent per subject and accuracy rates. Identify strengths and areas that need more focus.
                            </p>
                            <ul className="list-disc list-inside text-gray-500 mb-4">
                                <li>Total study time by subject</li>
                                <li>Accuracy rate per quiz</li>
                                <li>Weekly and monthly progress summaries</li>
                            </ul>
                            <button
                                onClick={() => handleNavigation( '/monthly-challenge' )}
                                className="mt-4 px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                                View Insights Dashboard
                            </button>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Visual Progress</h3>
                            <p className="text-gray-600 mb-4">
                                Stay motivated with visual graphs and charts that show your progress over time, giving you a clear view of your achievements.
                            </p>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-1/2">
                                    {/* Animated Circular Progress Bar Component */}
                                    <AnimatedCircularProgressBar
                                        max={100}
                                        min={0}
                                        value={75}
                                        gaugePrimaryColor="#a78bfa"
                                        gaugeSecondaryColor="#E5E7EB"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-indigo-700 font-semibold">Progress Highlights</h4>
                                    <p className="text-gray-500 text-sm">See your top-performing areas and areas needing improvement at a glance.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleNavigation( '/monthly-challenge' )}
                                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300">
                                Explore Progress Reports
                            </button>
                        </div>
                    </div>

                </section>

                <section className="py-16 bg-gradient-to-t from-teal-100 to-mint-100">
                    <h2 className="text-4xl font-semibold text-center text-teal-800 mb-8">
                        Start Your Repetitive Learning Journey Today
                    </h2>
                    <p className="text-center text-lg text-gray-800 mb-8">
                        Begin by setting small, achievable goals and commit to a daily learning routine. Over time, you'll
                        see substantial improvements.
                    </p>
                    <div className="text-center">
                        <a
                            href="/signup"
                            className="inline-block bg-teal-600 text-white font-semibold text-lg py-3 px-8 rounded-full hover:bg-teal-700 transition duration-300"
                        >
                            Get Started
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default WelcomePage;
