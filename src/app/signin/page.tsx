"use client";

import { Button } from "@/components/ui/button";
import { CoolMode } from "@/components/ui/cool-mode";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "@/components/ui/link";
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [userData, setUserData] = useState( {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    } );
    const [toastMessage, setToastMessage] = useState<{ type: "error" | "success"; message: string; } | null>( null );

    const showToast = ( type: "error" | "success", message: string ) => {
        setToastMessage( { type, message } );
        setTimeout( () => {
            setToastMessage( null );
        }, 5000 );
    };

    const checkAvailability = async ( data: any ) => {
        const { firstName, lastName, username, password, email } = data;

        try {


            if ( password !== userData.confirmPassword ) {
                showToast( "error", "Passwords do not match." );
                return;
            }
            console.log( data );

            const response = await fetch( `/api/users/${ data.email }` );
            console.log( response );

            if ( !response.ok ) {
                showToast( "error", 'Email already exists in the database. Try logging in.' );
                throw new Error( `Request failed with status ${ response.status }` );
            } else {
                handleRegister( data );
            }
        } catch ( e ) {
            console.error( e );
            showToast( "error", "An error occurred while checking email availability." );
        }
    };

    const handleRegister = async ( data: any ) => {
        try {
            const { firstName, lastName, username, password, email } = data;

            if ( password !== userData.confirmPassword ) {
                showToast( "error", "Passwords do not match." );
                return;
            }

            const full_name = firstName + " " + lastName as string;

            const response = await fetch( '/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( {
                    full_name,
                    username,
                    password,
                    email,
                    image: '',
                } ),
            } );

            if ( !response.ok ) {
                showToast( "error", 'Registration failed. Please try again later.' );
                throw new Error( `Request failed with status ${ response.status }` );
            } else {
                showToast( "success", "Registration successful! Redirecting..." );
                var registerInputs = document.querySelectorAll( 'input' );
                registerInputs.forEach( input => input.value = '' );
                router.push( '/dashboard' );
            }

        } catch ( error ) {
            console.error( 'Error during registration:', error );
        }
    };

    const handleLogin = async ( username: string, password: string ) => {
        console.log( 'Logging in:', username, password );
        try {
            const response = await fetch( '/api/auth/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify( { username, password } ),
            } );

            const result = await response.json();

            console.log( JSON.stringify( result.user ) );

            if ( response.ok ) {
                showToast( "success", "Login successful! Redirecting..." );
                sessionStorage.setItem( 'username', result.user.username );
                sessionStorage.setItem( 'email', result.user.email );
                sessionStorage.setItem( 'id', result.user.id );

                router.push( '/dashboard' );
            } else {
                showToast( "error", result.error || 'Invalid username or password.' );
            }
        } catch ( error ) {
            console.error( 'Error during login:', error );
            showToast( "error", 'An error occurred while logging in. Please try again later.' );
        }
    };


    const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setUserData( ( prevData ) => ( {
            ...prevData,
            [name]: value,
        } ) );
    };

    return (
        <ToastProvider>
            <ToastViewport className="top-middle" />
            {toastMessage && (
                <Toast variant={toastMessage.type === "error" ? "destructive" : "default"} position="top-middle">
                    <ToastTitle>{toastMessage.type === "error" ? "Error" : "Success"}</ToastTitle>
                    <ToastDescription>{toastMessage.message}</ToastDescription>
                </Toast>
            )}
            <div className="grid md:grid-cols-2 md:gap-6">
                {/* Login Form */}
                <div>
                    <h1 className="text-5xl font-extrabold text-stone text-center mb-5">Login</h1>
                    <form className="mx-auto w-full p-10" onSubmit={( e ) => {
                        e.preventDefault();
                        const formData = new FormData( e.currentTarget );
                        handleLogin( formData.get( 'login_username' ) as string, formData.get( 'login_password' ) as string );
                    }}>
                        {/* Username Input */}
                        <div className="relative z-0 w-full mb-5 group">
                            <Label htmlFor="login_username">Username</Label>
                            <Input
                                type="text"
                                name="login_username"
                                id="login_username"
                                placeholder="Enter your username"
                                required
                                autoComplete="username"
                            />
                        </div>
                        {/* Password Input */}
                        <div className="relative z-0 w-full mb-5 group">
                            <Label htmlFor="login_password">Password</Label>
                            <Input
                                type="password"
                                name="login_password"
                                id="login_password"
                                placeholder="Enter your password"
                                required
                                autoComplete="current-password"
                            />
                        </div>
                        <Link href="#" text="Forgot Password" />
                        <CoolMode options={{ particleCount: 50 }}>
                            <Button size="lg">Login</Button>
                        </CoolMode>
                    </form>
                </div>
                {/* Registration Form */}
                <div>
                    <h1 className="text-5xl font-extrabold text-stone text-center mb-5">Register</h1>
                    <form className="mx-auto w-full p-10" onSubmit={( e ) => {
                        e.preventDefault();
                        checkAvailability( userData );
                    }}>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            {/* First Name */}
                            <div className="relative z-0 w-full mb-5 group">
                                <Label htmlFor="register_fName">First Name</Label>
                                <Input
                                    id="register_fName"
                                    type="text"
                                    name="firstName"
                                    value={userData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First name"
                                    required
                                />
                            </div>
                            {/* Last Name */}
                            <div className="relative z-0 w-full mb-5 group">
                                <Label htmlFor="register_lName">Last Name</Label>
                                <Input
                                    id="register_lName"
                                    type="text"
                                    name="lastName"
                                    value={userData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last name"
                                    required
                                />
                            </div>
                        </div>
                        {/* Username */}
                        <div className="relative z-0 w-full mb-5 group">
                            <Label htmlFor="register_username">Username</Label>
                            <Input
                                id="register_username"
                                type="text"
                                name="username"
                                value={userData.username}
                                onChange={handleInputChange}
                                placeholder="Username"
                                required
                                autoComplete="username"
                            />
                        </div>
                        {/* Email */}
                        <div className="relative z-0 w-full mb-5 group">
                            <Label htmlFor="register_email">Email Address</Label>
                            <Input
                                id="register_email"
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                placeholder="Email address"
                                required
                                autoComplete="email"
                            />
                        </div>
                        {/* Password and Confirm Password */}
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <Label htmlFor="register_password">Password</Label>
                                <Input
                                    id="register_password"
                                    type="password"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                    required
                                    autoComplete="new-password"
                                />
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <Label htmlFor="register_cPassword">Confirm Password</Label>
                                <Input
                                    id="register_cPassword"
                                    type="password"
                                    name="confirmPassword"
                                    value={userData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm password"
                                    required
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>
                        <CoolMode options={{ particleCount: 50 }}>
                            <Button size="lg">Register</Button>
                        </CoolMode>
                    </form>
                </div>
            </div>
        </ToastProvider>
    );
};

export default LoginPage;
