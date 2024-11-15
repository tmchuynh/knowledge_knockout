import { NextResponse } from 'next/server';

export async function POST() {
    try {
        // Create a response that clears the 'token' cookie
        const response = NextResponse.json( { message: 'Logout successful' } );

        // Clear the 'token' cookie by setting it with an immediate expiration
        response.cookies.set( 'token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0, // Expire immediately
            path: '/',
        } );

        return response;
    } catch ( error ) {
        console.error( 'Error during logout:', error );
        return NextResponse.json( { message: 'Internal server error' }, { status: 500 } );
    }
}
