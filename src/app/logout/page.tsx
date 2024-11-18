'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LogOutPage() {
    const router = useRouter();

    const handleLogOut = async () => {
        try {
            const response = await fetch( '/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            } );

            if ( response.ok ) {
                router.push( '/login' );
            } else {
                console.error( 'Failed to log out' );
            }
        } catch ( error ) {
            console.error( 'Error during sign-out:', error );
        }
    };

    return (
        <div className="flex flex-col gap-2 justify-center text-center p-6 rounded-lg shadow-md border hover:shadow-md w-11/12 mx-auto">
            <h2 className="text-center">Are you sure you want to sign out?</h2>
            <Button
                variant={"destructive"}
                onClick={handleLogOut}
            >
                See you soon!
            </Button>
        </div>
    );
}
