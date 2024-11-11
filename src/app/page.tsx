"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { GeneralizedForm } from "./components/ui/form-input";

const LoginPage: React.FC = () => {
    const router = useRouter();

    const handleLogin = ( data: any ) => {
        const { email, password } = data;

        // Assuming a login API endpoint
        fetch( '/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( { email, password } ),
        } )
            .then( response => response.json() )
            .then( data => {
                if ( data.token ) {
                    // Store the token in local storage
                    localStorage.setItem( 'token', data.token );
                    router.push( '/' );
                } else {
                    // Handle login failure
                    alert( 'Invalid username or password' );
                }
            } );
    };

    const fields = [
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
        },
    ];

    return (
        <div className="grid md:grid-cols-2 md:gap-6">
            <div>
                <h2 className="text-4xl font-extrabold mb-5 text-center pt-8">Login</h2>
                <GeneralizedForm
                    fields={fields}
                    onSubmit={handleLogin}
                    buttonProps={{
                        variant: "default", // Customize button style
                        size: "lg",
                    }}
                />
            </div>
        </div>
    );
};

export default LoginPage;
