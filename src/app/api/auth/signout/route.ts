import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = NextResponse.json( { message: 'Signout successful' } );
        response.cookies.set( 'auth_token', '', { path: '/', expires: new Date( 0 ) } );

        return response;
    } catch ( error ) {
        console.error( 'Error during signout:', error );
        return NextResponse.json( { message: 'Error during signout' }, { status: 500 } );
    }
}
