"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";
import { GeneralizedForm } from "./components/ui/form-input";

const LoginPage: React.FC = () => {
    const router = useRouter();

    const handleLogin = ( data: any ) => {
        const { email, password } = data;

        fetch( '/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( { email, password } ),
        } )
            .then( response => response.json() )
            .then( data => {
                if ( data.token ) {
                    localStorage.setItem( 'token', data.token );
                    router.push( '/quiz' );
                } else {
                    alert( 'Invalid username or password' );
                }
            } );
    };

    const handleRegister = ( data: any ) => {
        const { email, password } = data;

        fetch( '/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( { email, password } ),
        } )
            .then( response => response.json() )
            .then( data => {
                if ( data.token ) {
                    localStorage.setItem( 'token', data.token );
                    router.push( '/signin' );
                } else {
                    alert( 'Invalid username or password' );
                }
            } );
    };

    const loginFields = [
        {
            name: "email",
            label: "Email",
            placeholder: "Enter your email",
            validation: z.string().email( "Invalid email address." ),
            description: "Please enter a valid email address.",
        },
        {
            name: "password",
            label: "Password",
            placeholder: "Enter your password",
            validation: z.string().min( 6, "Password must be at least 6 characters." ),
            inputProps: { type: "password" },
            description: "Password must be at least 6 characters long.",
        }
    ];

    const registerFields = [
        {
            name: "first_name",
            label: "First Name",
            placeholder: "Enter your first name",
            validation: z.string().min( 2, "First name must be at least 2 characters." ),
        },
        {
            name: "last_name",
            label: "Last Name",
            placeholder: "Enter your last name",
            validation: z.string().min( 2, "Last name must be at least 2 characters." ),
        },
        {
            name: "email",
            label: "Email",
            placeholder: "Enter your email",
            validation: z.string().email( "Invalid email address." ),
            description: "Please enter a valid email address.",
        },
        {
            name: "username",
            label: "Username",
            placeholder: "Enter your username",
            validation: z.string().min( 6, "Username must be at least 6 characters." ),
            description: "Username must be at least 6 characters long and unique.",
        },
        {
            name: "password",
            label: "Password",
            placeholder: "Enter your password",
            validation: z.string().min( 6, "Password must be at least 6 characters." ),
            inputProps: { type: "password" },
            description: "Password must be at least 6 characters long.",
        },
        {
            name: "confirm_password",
            label: "Confirm Password",
            placeholder: "Confirm your password",
            validation: z.string().min( 6, "Password must be at least 6 characters." ),
            inputProps: { type: "password" },
            description: "Password must be at least 6 characters long.",
        },
    ];

    return (
        <div className="grid md:grid-cols-2 md:gap-6">
            <div>
                <h2 className="text-4xl font-extrabold mb-5 text-center pt-8">Login</h2>
                <GeneralizedForm
                    fields={loginFields}
                    onSubmit={handleLogin}
                    buttonProps={{
                        variant: "default",
                        size: "lg",
                    }}
                />
            </div>
            <div>
                <h2 className="text-4xl font-extrabold mb-5 text-center pt-8">Register</h2>
                <GeneralizedForm
                    fields={registerFields}
                    onSubmit={handleRegister}
                    buttonProps={{
                        variant: "default",
                        size: "lg",
                    }}
                />
            </div>
        </div>
    );
};

export default LoginPage;
