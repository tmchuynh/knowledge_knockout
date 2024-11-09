// app/components/Header.tsx
'use client';

import Link from 'next/link';
import "../styles.css";

const Header = () => {

    return (
        <header className="p-4 bg-gray-900 text-white flex justify-between items-center">
            <h1 className="text-2xl col-span-9">My App</h1>
            <nav>
                <>
                    <Link className='p-7' href={`/${ 0 }/dashboard`}>Profile</Link>
                    <Link className='p-7' href="/leaderboard">Leaderbord</Link>
                    <Link className='p-7' href="/quiz">Quiz</Link>
                    <Link className='p-7' href="/api/auth/logout">Logout</Link>
                </>
            </nav>
        </header>
    );
};

export default Header;
