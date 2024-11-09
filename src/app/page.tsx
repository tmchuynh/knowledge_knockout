"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthPage = () => {
    const router = useRouter();

    useEffect( () => {
        router.push( `/quiz` );
    }, [router] );

};

export default AuthPage;;
