"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useNotFound } from "../context/NotFoundContext";
import styles from "./styles/not-found.module.css";

export default function NotFound() {
    const [digits, setDigits] = useState( { first: "4", second: "0", third: "4" } );
    const { setNotFound } = useNotFound();

    useEffect( () => {
        setNotFound( true );
        document.body.classList.add( styles.notFoundBody );

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
                <Link href="/quiz" className={styles.backHomeLink}>
                    Go back to Home
                </Link>
            </div>
        </div>
    );
}
