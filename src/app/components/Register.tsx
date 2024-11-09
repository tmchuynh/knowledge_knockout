"use client";

import { useRouter } from 'next/navigation';

const Register = () => {
    const router = useRouter();

    const handleRegister = () => {
        router.push( '/api/auth/login?screen_hint=signup' );
    };

    return (
        <button onClick={handleRegister} className="btn-primary">
            Register with Auth0
        </button>
    );
};

export default Register;