"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import Link from "./components/ui/link";
import { CoolMode } from "./components/ui/cool-mode";
import { signIn } from "../../auth";

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [userData, setUserData] = useState( {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    } );

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
                <form className="mx-auto w-full p-10" action={async ( formData ) => {
                    "use server";
                    await signIn( "credentials", formData );
                }}>
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
                    <Link
                        href="#"
                        text="Forgot Password"
                        icon={
                            <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 14 10">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        }
                    />
                    <CoolMode options={{ particleCount: 50 }}>
                        <Button size="lg">Login</Button>
                    </CoolMode>
                </form>
            </div>
            <div>
                <h2 className="text-4xl font-extrabold mb-5 text-center pt-8">Register</h2>
                <form className="mx-auto w-full p-10" onSubmit={handleRegister}>
                    <div className="grid md:grid-cols-2 md:gap-6">
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
    );
};

export default LoginPage;
