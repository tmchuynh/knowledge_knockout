"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "./styles.css";
import { Input } from "./components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/app/components/ui/popover";


const LoginPage: React.FC = () => {
    const router = useRouter();
    const [userData, setUserData] = useState( {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    } );

    const handleLogin = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        const username = ( event.target as HTMLFormElement ).username.value;
        const password = ( event.target as HTMLFormElement ).password.value;

        // Assuming a login API endpoint
        fetch( '/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( { username, password } ),
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

    const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setUserData( ( prevData ) => ( {
            ...prevData,
            [name]: value
        } ) );
    };

    const handleSubmit = ( e: React.FormEvent ) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="grid md:grid-cols-2 md:gap-6">
            {/* Register Form */}
            <div>
                <h2 className="text-4xl font-extrabold mb-5 text-center pt-8">Register</h2>
                <form className="mx-auto w-full p-10" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <Input
                                id="register_fName"
                                type="text"
                                name="firstName"
                                value={userData.firstName}
                                onChange={handleInputChange}
                                placeholder="First name"
                            />
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <Input
                                id="register_lName"
                                type="text"
                                name="lastName"
                                value={userData.lastName}
                                onChange={handleInputChange}
                                placeholder="Last name"
                            />
                        </div>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <Input
                            id="register_email"
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            placeholder="Email address"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <Input
                                id="register_password"
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                            />
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <Input
                                id="register_cPassword"
                                type="password"
                                name="confirmPassword"
                                value={userData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm password"
                            />
                        </div>
                    </div>
                    <button type="submit" className="button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center">
                        Submit
                    </button>
                </form>
            </div>

            {/* Login Form */}
            <div>
                <h2 className="text-4xl font-extrabold mb-5 text-center pt-8">Login</h2>
                <form className="mx-auto w-full p-10" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <Input
                            id="login_email"
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            placeholder="Email address"
                        />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <Input
                            id="login_password"
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                        />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 py-5">
                        <a
                            href="#"
                            id="reset_password"
                            className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            Forgot Password
                            <svg
                                className="w-4 h-4 ms-2 rtl:rotate-180"
                                aria-hidden="true"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </a>
                    </p>
                    <button type="submit" className="button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;