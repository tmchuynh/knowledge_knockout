import React from 'react';
import {
    Trophy,
    Medal,
    Star,
    Flame,
} from 'lucide-react';
import { main } from '@popperjs/core';
import AnimatedCircularProgressBar from './components/ui/animated-circular-progress-bar';

const WelcomePage = () => {
    return (
        <div className="min-h-screen text-gray-900">
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
                            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">
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
                            <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300">
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
                            <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300">
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
                            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
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

                <section >
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-semibold text-teal-800">
                            Gamification Elements
                        </h2>
                        <p className="text-lg text-gray-800 mt-4">
                            Make learning fun and engaging with gamified elements.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
                        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold text-green-700 mb-4">Badges and Rewards</h3>
                            <p className="text-gray-600 mb-4">
                                Earn badges as you complete quizzes and reach milestones. Consistent studying is rewarded, motivating you to keep progressing.
                            </p>
                            <ul className="flex space-x-6 justify-center mb-4">
                                <li className="flex flex-col items-center">
                                    <div className="p-2 rounded-full bg-emerald-100">
                                        <Trophy className="w-8 h-8 text-teal-700" />
                                    </div>
                                    <span className="text-gray-500 text-sm">Bronze</span>
                                </li>
                                <li className="flex flex-col items-center">
                                    <div className="p-2 rounded-full bg-emerald-100">
                                        <Medal className="w-8 h-8 text-teal-700" />
                                    </div>
                                    <span className="text-gray-500 text-sm">Silver</span>
                                </li>
                                <li className="flex flex-col items-center">
                                    <div className="p-2 rounded-full bg-emerald-100">
                                        <Star className="w-8 h-8 text-teal-700" />
                                    </div>
                                    <span className="text-gray-500 text-sm">Gold</span>
                                </li>
                            </ul>
                            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 transition-colors duration-300">
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
                                    <p className="text-gray-500 text-sm">Compete with peers and win special rewards.</p>
                                </div>
                            </div>
                            <button className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-300">
                                Join a Challenge
                            </button>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold text-blue-700 mb-4">Monthly Challenge</h3>
                            <p className="text-gray-600 mb-4">
                                Take on our monthly challenges designed to test your consistency and dedication over a longer period. Complete these challenges to unlock major rewards and recognition.
                            </p>
                            <div className="flex items-center space-x-6 mb-4">
                                <div className="p-3 bg-blue-100 rounded-full w-14 h-14 flex justify-center items-center">
                                    <Trophy className="text-blue-700 w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-blue-700 font-semibold">Exclusive Monthly Challenge</h4>
                                    <p className="text-gray-500 text-sm">Commit to a month-long challenge and see your progress soar.</p>
                                </div>
                            </div>
                            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                                Join the Monthly Challenge
                            </button>
                        </div>
                    </div>
                </section >

                <section>
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-semibold text-indigo-900">
                            Progress Tracking and Analytics
                        </h2>
                        <p className="text-lg text-gray-800 mt-4">
                            Stay informed about your learning progress and optimize your study plan.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Detailed Insights</h3>
                            <p className="text-gray-600 mb-4">
                                Track your study habits with insights like time spent per subject and accuracy rates. Identify strengths and areas that need more focus.
                            </p>
                            <ul className="list-disc list-inside text-gray-500 mb-4">
                                <li>Total study time by subject</li>
                                <li>Accuracy rate per quiz</li>
                                <li>Weekly and monthly progress summaries</li>
                            </ul>
                            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                                View Insights Dashboard
                            </button>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold text-fuchsia-700 mb-4">Visual Progress</h3>
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
                                        gaugePrimaryColor="#c026d3"
                                        gaugeSecondaryColor="#E5E7EB"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-fuchsia-700 font-semibold">Progress Highlights</h4>
                                    <p className="text-gray-500 text-sm">See your top-performing areas and areas needing improvement at a glance.</p>
                                </div>
                            </div>
                            <button className="mt-4 px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300">
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
            </main >

            <footer className="py-6 bg-stone-500">
                <div className="container mx-auto text-center text-white">
                    <p>&copy; {new Date().getFullYear()} Your Learning Platform. All rights reserved.</p>
                </div>
            </footer>
        </div >
    );
};

export default WelcomePage;
