"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface TimerProps {
    scoreId?: string | null; // Make scoreId optional to handle initial null state
}

export default function Timer( { scoreId }: TimerProps ) {
    const [secondsElapsed, setSecondsElapsed] = useState<number>( 0 );
    const pathname = usePathname();

    useEffect( () => {
        if ( !scoreId ) return; // Wait until scoreId is available

        // Fetch the initial timelapsed value from the server
        const fetchInitialTime = async () => {
            try {
                const response = await fetch( `/api/score/${ scoreId }`, {
                    credentials: 'include',
                } );
                if ( !response.ok ) {
                    throw new Error( 'Failed to fetch initial time' );
                }
                const data = await response.json();
                if ( data.timelapsed ) {
                    const [hours, minutes, seconds] = data.timelapsed.split( ':' ).map( Number );
                    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
                    setSecondsElapsed( totalSeconds );
                    sessionStorage.setItem( "secondsElapsed", totalSeconds.toString() );
                }
            } catch ( error ) {
                console.error( 'Error fetching initial time:', error );
            }
        };

        fetchInitialTime();

        // Start the timer when the component loads
        const interval = setInterval( () => {
            setSecondsElapsed( ( prev ) => {
                const newTime = prev + 1;
                sessionStorage.setItem( "secondsElapsed", newTime.toString() );

                // Call the API to update the timelapsed value only if scoreId is present
                updateTimelapsed( newTime, scoreId );

                return newTime;
            } );
        }, 1000 );

        // Cleanup the timer when navigating to a /results page
        if ( pathname && pathname.endsWith( "/results" ) ) {
            clearInterval( interval );
            sessionStorage.removeItem( "timerStarted" );
        }

        return () => {
            clearInterval( interval );
        };
    }, [pathname, scoreId] ); // Add scoreId to the dependency array

    // Helper function to call the API route
    const updateTimelapsed = async ( timelapsed: number, id: string ) => {
        console.log( timelapsed, id );
        try {
            await fetch( `/api/score/${ id }`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( {
                    timelapsed: formatTime( timelapsed ), // Send the formatted HH:MM:SS string
                } ),
            } );
        } catch ( error ) {
            console.error( 'Error updating timelapsed:', error );
        }
    };

    // Helper function to format the time in hh:mm:ss
    const formatTime = ( totalSeconds: number ): string => {
        const hours = Math.floor( totalSeconds / 3600 );
        const minutes = Math.floor( ( totalSeconds % 3600 ) / 60 );
        const seconds = totalSeconds % 60;

        const paddedHours = String( hours ).padStart( 2, "0" );
        const paddedMinutes = String( minutes ).padStart( 2, "0" );
        const paddedSeconds = String( seconds ).padStart( 2, "0" );

        return `${ paddedHours }:${ paddedMinutes }:${ paddedSeconds }`;
    };

    return (
        <div>
            <span className="text-xl font-mono">{formatTime( secondsElapsed )}</span>
        </div>
    );
}
