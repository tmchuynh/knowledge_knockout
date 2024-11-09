"use client";

import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();

    const handleLogin = () => {
        router.push( '/api/auth/login' );
    };

    return (
        <button onClick={handleLogin} className="btn-primary">
            Login with Auth0
        </button>
    );
};

export default Login;
