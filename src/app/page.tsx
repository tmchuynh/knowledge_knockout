"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";
import { GeneralizedForm } from "./components/ui/form-input";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

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
        fetch( '/api/auth/signin', {
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
            autoComplete: "email",
        },
        {
            name: "password",
            label: "Password",
            placeholder: "Enter your password",
            validation: z.string().min( 6, "Password must be at least 6 characters." ),
            inputProps: { type: "password" },
            description: "Password must be at least 6 characters long.",
            autoComplete: "current-password",
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
            autoComplete: "username",
        },
        {
            name: "password",
            label: "Password",
            placeholder: "Enter your password",
            validation: z.string().min( 6, "Password must be at least 6 characters." ),
            inputProps: { type: "password" },
            description: "Password must be at least 6 characters long.",
            autoComplete: "new-password",
        },
        {
            name: "confirm_password",
            label: "Confirm Password",
            placeholder: "Confirm your password",
            validation: z.string().min( 6, "Password must be at least 6 characters." ),
            inputProps: { type: "password" },
            description: "Password must be at least 6 characters long.",
            autoComplete: "new-password",
        },
    ];

    const handleSubmit = ( e: React.FormEvent ) => {
        e.preventDefault();
        // Handle form submission
    };

    const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setUserData( ( prevData ) => ( {
            ...prevData,
            [name]: value
        } ) );
    };

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
                    <Button
                        size="lg">
                        Register
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;


{/* <div id="popover-password" role="tooltip" class="absolute z-10 invisible text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
						<div class="p-3 space-y-2">
							<h3 class="font-semibold text-gray-900 dark:text-white">Password Requirements</h3>
							<ul>
								<li id="requirement-length" class="flex items-center mb-1">
									<svg class="requirement-icon w-3.5 h-3.5 me-2 text-gray-300 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 16 12">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917L5.724 10.5 15 1.5" />
									</svg>
									At least 8 characters (max 15)
								</li>
								<li id="requirement-uppercase" class="flex items-center mb-1">
									<svg class="requirement-icon w-3.5 h-3.5 me-2 text-gray-300 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 16 12">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917L5.724 10.5 15 1.5" />
									</svg>
									Includes one uppercase letter
								</li>
								<li id="requirement-lowercase" class="flex items-center mb-1">
									<svg class="requirement-icon w-3.5 h-3.5 me-2 text-gray-300 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 16 12">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917L5.724 10.5 15 1.5" />
									</svg>
									Includes one lowercase letter
								</li>
								<li id="requirement-number" class="flex items-center mb-1">
									<svg class="requirement-icon w-3.5 h-3.5 me-2 text-gray-300 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 16 12">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917L5.724 10.5 15 1.5" />
									</svg>
									Includes one number
								</li>
								<li id="requirement-special" class="flex items-center">
									<svg class="requirement-icon w-3.5 h-3.5 me-2 text-gray-300 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 16 12">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917L5.724 10.5 15 1.5" />
									</svg>
									Includes one special character
								</li>
							</ul>
						</div>
						<div data-popper-arrow></div>
					</div> */}