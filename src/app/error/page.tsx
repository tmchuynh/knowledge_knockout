"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../styles/not-found.module.css";
import React from "react";
import { useNotFound } from "@/context/NotFoundContext";

export default function NotFound() {
    const [digits, setDigits] = useState( { first: "4", second: "0", third: "4" } );
    const { setNotFound } = useNotFound();
    const [tokenExists, setTokenExists] = useState<boolean>( false );  // Track token existence in state

    useEffect( () => {
        setNotFound( true );
        document.body.classList.add( styles.notFoundBody );

        const tokenMatch = document.cookie.match( /token=([^;]+)/ );
        const token = tokenMatch ? tokenMatch[1] : null;

        if ( !token ) {
            console.warn( "No token found. Skipping user fetch." );
            setTokenExists( false );  // No token, update state accordingly
            return;
        } else {
            setTokenExists( true );  // Token exists, update state
        }

        const fetchUser = async () => {
            try {
                const response = await fetch( "/api/auth/me", {
                    credentials: "include",
                } );

                if ( !response.ok ) {
                    throw new Error( `Failed to fetch user, status: ${ response.status }` );
                }

                const data = await response.json();
                // Do something with the user data if needed (e.g., store in state)
            } catch ( error ) {
                console.error( "Error fetching user:", error );
            }
        };

        fetchUser();

        return () => {
            setNotFound( false );
            document.body.classList.remove( styles.notFoundBody );
        };
    }, [setNotFound] );

    return (
        <div className={styles.notFoundContainer}>
            <div>
                <div className={styles.digitContainer}>
                    <span className={styles.digit}>{digits.first}</span>
                    <span className={styles.digit}>{digits.second}</span>
                    <span className={styles.digit}>{digits.third}</span>
                </div>
                <p className={styles.message}>Oops! The page you're looking for doesn't exist.</p>
                {tokenExists ? (
                    <Link href="/quiz" className={styles.backHomeLink}>
                        Go back to Home
                    </Link>
                ) : (
                    <Link href="/login" className={styles.backHomeLink}>
                        Go back to Login
                    </Link>
                )}
            </div>
        </div>
    );
}
