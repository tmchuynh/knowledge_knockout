import { NextResponse } from 'next/server';
import { User } from '@//backend/models';

export async function GET( request: Request ) {
    try {
        const { searchParams } = new URL( request.url );
        const username = searchParams.get( 'username' );

        console.log( "USERNAME", username );

        if ( !username ) {
            return NextResponse.json( { error: 'Username is required' }, { status: 400 } );
        }

        const user = await User.findOne( { where: { username } } );

        if ( !user ) {
            return NextResponse.json( { error: 'User not found' }, { status: 404 } );
        }

        return NextResponse.json( { user }, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error retrieving user:', error );
        return NextResponse.json( { error: 'Internal server error' }, { status: 500 } );
    }
}


export async function PUT( _req: Request, props: { params: Promise<{ username?: string, email?: string, image?: string; }>; } ) {
    const params = await props.params;
    try {
        const { username, email, image } = params;
        const user = await User.findOne( { where: { username } } );

        if ( !user ) {
            return NextResponse.json( { error: 'User not found' }, { status: 404 } );
        }

        if ( username ) {
            await user.update( { username: username }, { where: { username } } );
        }

        if ( email ) {
            await user.update( { email: email }, { where: { username } } );
        }

        if ( image ) {
            await user.update( { image: image }, { where: { username } } );
        }

    } catch ( _error ) {
        return NextResponse.json( { error: 'Internal server error' }, { status: 500 } );
    }
}