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
    const [isLoading, setIsLoading] = useState( false );

    const showToast = ( type: "error" | "success", message: string ) => {
        setToastMessage( { type, message } );
        setTimeout( () => {
            setToastMessage( null );
        }, 5000 );
    };

    const checkAvailability = async ( data: any ) => {
        const { username } = data;

        try {
            const response = await fetch( `/api/users?username=${ username }`, {
                credentials: 'include',
            } );

            if ( response.ok ) {
                showToast( "error", 'Username already exists in the database. Try logging in.' );
            } else {
                handleRegister( data );
            }
        } catch ( e ) {
            console.error( e );
            showToast( "error", "An error occurred while checking username availability." );
        }
    };

    const handleRegister = async ( data: any ) => {
        const { firstName, lastName, username, password, email } = data;

        if ( password !== userData.confirmPassword ) {
            showToast( "error", "Passwords do not match." );
        }

        setIsLoading( true );

        try {
            const response = await fetch( '/api/auth/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { full_name: `${ firstName } ${ lastName }`, username, password, email, image: '' } ),
            } );

            if ( !response.ok ) {
                showToast( "error", 'Registration failed. Please try again later.' );
            } else {
                showToast( "success", "Registration successful! Redirecting..." );
                setUserData( { firstName: '', lastName: '', email: '', username: '', password: '', confirmPassword: '' } );
                router.push( '/signin' );
            }
        } catch ( error ) {
            console.error( 'Error during registration:', error );
            showToast( "error", "An error occurred during registration." );
        } finally {
            setIsLoading( false );
        }
    };

    const handleLogin = async ( username: string, password: string ) => {
        setIsLoading( true );

        try {
            const response = await fetch( '/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { username, password } ),
                credentials: 'include',
            } );

            if ( !response.ok ) {
                throw new Error( 'Login failed' );
            }

            // Fetch user data after retrieving token
            const userResponse = await fetch( '/api/auth/me', {
                method: 'GET',
                credentials: 'include',
            } );

            if ( !userResponse.ok ) {
                throw new Error( 'Failed to fetch user data' );
            }

            const userData = await userResponse.json();
            console.log( 'User data:', userData );

            showToast( "success", "Login successful! Redirecting..." );
            router.push( '/dashboard' );

        } catch ( error ) {
            console.error( 'Error during login or fetching user data:', error );
            showToast( "error", "Login failed. Please check your credentials." );
        } finally {
            setIsLoading( false );
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
                            <Button size="lg" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</Button>
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
                            <Button size="lg">{isLoading ? 'Registering...' : 'Register'}</Button>
                        </CoolMode>
                    </form>
                </div>
            </div>
        </ToastProvider>
    );
};

export default LoginPage;
