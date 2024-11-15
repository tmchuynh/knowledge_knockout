"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/src/lib/utils";

export default function NumberTicker( {
    value,
    direction = "up",
    delay = 0,
    className,
    decimalPlaces = 0,
}: {
    value: number;
    direction?: "up" | "down";
    className?: string;
    delay?: number; // delay in s
    decimalPlaces?: number;
} ) {
    const ref = useRef<HTMLSpanElement>( null );
    const motionValue = useMotionValue( direction === "down" ? value : 0 );
    const springValue = useSpring( motionValue, {
        damping: 60,
        stiffness: 100,
    } );
    const isInView = useInView( ref, { once: false, margin: "0px" } ); // Corrected property

    useEffect( () => {
        if ( isInView ) {
            setTimeout( () => {
                motionValue.set( direction === "down" ? 0 : value );
            }, delay * 1000 );
        } else {
            // Reset the motion value to the starting point when out of view
            motionValue.set( direction === "down" ? value : 0 );
        }
    }, [motionValue, isInView, delay, value, direction] );

    useEffect( () => {
        return springValue.on( "change", ( latest ) => {
            if ( ref.current ) {
                ref.current.textContent = Intl.NumberFormat( "en-US", {
                    minimumFractionDigits: decimalPlaces,
                    maximumFractionDigits: decimalPlaces,
                } ).format( Number( latest.toFixed( decimalPlaces ) ) );
            }
        } );
    }, [springValue, decimalPlaces] );

    return (
        <span
            className={cn(
                "inline-block tabular-nums text-black dark:text-white tracking-wider",
                className
            )}
            ref={ref}
        />
    );
}
