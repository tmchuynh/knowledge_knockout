import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { User } from '@//backend/models';

export async function POST( req: NextRequest ) {
    const { username, password } = await req.json();

    try {
        // Find the user by username
        const user = await User.findOne( { where: { username } } );
        if ( !user ) {
            return NextResponse.json( { message: 'User not found' }, { status: 404 } );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare( password, user.password );
        if ( !isPasswordValid ) {
            return NextResponse.json( { message: 'Incorrect password' }, { status: 401 } );
        }

        return NextResponse.json( {
            message: 'Login successful',
            user: {
                id: user.id,
                firstName: user.full_name,
                username: user.username,
                email: user.email,
            },
        }, { status: 200 } );

    } catch ( error ) {
        console.error( 'Error logging in user:', error );
        return NextResponse.json( { message: 'Internal server error' }, { status: 500 } );
    }
}