"use client";

import { Button } from "../components/ui/button";

export default function SignInButton( { providerId, callbackUrl }: { providerId: string, callbackUrl: string; } ) {
    const handleSignIn = async () => {
        try {
            const response = await fetch( '/api/auth/signin', {
                method: 'POST',
                body: JSON.stringify( {
                    provider: providerId,
                    redirectTo: callbackUrl,
                } ),
            } );

            if ( response.ok ) {
                window.location.href = callbackUrl || '/';
            } else {
                throw new Error( 'Error signing in' );
            }
        } catch ( error ) {
            console.error( "Sign-in failed:", error );
        }
    };

    return (
        <Button onClick={handleSignIn} variant="default" size="lg">
            {`Sign in with ${ providerId }`}
        </Button>
    );
}
