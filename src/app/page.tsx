"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import Link from "./components/ui/link";
import { CoolMode } from "./components/ui/cool-mode";
import {
    ToastProvider,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastViewport
} from "./components/ui/toast";

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [userData, setUserData] = useState( {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    } );
    const [toastMessage, setToastMessage] = useState<{ type: "error" | "success"; message: string; } | null>( null );

    const showToast = ( type: "error" | "success", message: string ) => {
        setToastMessage( { type, message } );
        setTimeout( () => {
            setToastMessage( null );
        }, 5000 );
    };

    const handleRegister = async ( data: any ) => {
        const { firstName, lastName, username, password, email, phoneNumber } = data;

        if ( password !== userData.confirmPassword ) {
            showToast( "error", "Passwords do not match." );
            return;
        }

        try {
            const response = await fetch( '/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( {
                    first_name: firstName,
                    last_name: lastName,
                    username,
                    password,
                    email,
                    phone_number: phoneNumber,
                } ),
            } );

            const result = await response.json();

            if ( response.ok ) {
                showToast( "success", "Registration successful! Redirecting to login page..." );
                router.push( '/signin' );
            } else {

                showToast( "error", result.message || 'Registration failed. Please try again.' );
            }
        } catch ( error ) {

            console.error( 'Error during registration:', error );
            showToast( "error", 'An error occurred while registering. Please try again later.' );
        }
    };


    const handleLogin = async ( email: string, password: string ) => {
        try {

            const response = await fetch( '/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { email, password } ),
            } );


            const result = await response.json();

            if ( response.ok && result.token ) {

                showToast( "success", "Login successful! Redirecting..." );


                localStorage.setItem( 'token', result.token );
                router.push( '/dashboard' );
            } else {
                showToast( "error", result.message || 'Invalid email or password.' );
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
            [name]: value
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
                    <h2 className="text-4xl font-extrabold mb-5 text-center pt-8">Login</h2>
                    <form className="mx-auto w-full p-10" onSubmit={( e ) => {
                        e.preventDefault();
                        const formData = new FormData( e.currentTarget );
                        handleLogin( formData.get( 'login_email' ) as string, formData.get( 'login_password' ) as string );
                    }}>
                        {/* Email Input */}
                        <div className="relative z-0 w-full mb-5 group">
                            <Label htmlFor="login_email">Email address</Label>
                            <Input
                                type="email"
                                name="login_email"
                                id="login_email"
                                placeholder="Enter your email"
                                required
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
                    <h2 className="text-4xl font-extrabold mb-5 text-center pt-8">Register</h2>
                    <form className="mx-auto w-full p-10" onSubmit={( e ) => {
                        e.preventDefault();
                        handleRegister( userData );
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
