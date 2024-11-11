"use client";

import { useRouter } from 'next/navigation';

const Register = () => {
    const router = useRouter();

    const handleRegister = () => {
        router.push( '/api/auth/signin' );
    };

    return (
        <button onClick={handleRegister} className="btn-primary">
            Register with Auth0
        </button>
    );
};

export default Register;