'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            const response = await fetch( '/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            } );

            if ( response.ok ) {
                router.push( '/' );
            } else {
                console.error( 'Failed to log out' );
            }
        } catch ( error ) {
            console.error( 'Error during sign-out:', error );
        }
    };

    return (
        <div className="flex flex-col gap-2 justify-center text-center">
            <h1 className="text-5xl font-extrabold text-stone text-center mb-5">Are you sure you want to sign out?</h1>
            <Button
                variant={"destructive"}
                onClick={handleSignOut}
            >
                See you soon!
            </Button>
        </div>
    );
}
