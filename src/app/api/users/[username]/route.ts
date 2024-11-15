import { NextResponse } from 'next/server';
import { User } from '@/backend/models';

export async function GET( request: Request ) {
    try {
        const { searchParams } = new URL( request.url );
        const username = searchParams.get( 'username' );

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

export async function PUT( req: Request ) {
    try {
        const { username, email, image } = await req.json();

        if ( !username ) {
            return NextResponse.json( { error: 'Username is required to update user information' }, { status: 400 } );
        }

        const user = await User.findOne( { where: { username } } );

        if ( !user ) {
            return NextResponse.json( { error: 'User not found' }, { status: 404 } );
        }

        // Update fields only if they are provided
        const updatedFields: Partial<{ username: string; email: string; image: string; }> = {};
        if ( email ) updatedFields.email = email;
        if ( image ) updatedFields.image = image;

        await user.update( updatedFields );

        return NextResponse.json( { message: 'User information updated successfully', user }, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error updating user:', error );
        return NextResponse.json( { error: 'Internal server error' }, { status: 500 } );
    }
}
