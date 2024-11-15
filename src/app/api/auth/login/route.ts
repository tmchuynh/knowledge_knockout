import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { User } from '@/backend/models';
import dotenv from 'dotenv';
import { signJWT } from '@/utils/jwtUtils';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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

        // Create JWT payload
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
        };

        // Sign the JWT
        const token = signJWT( payload, JWT_SECRET );

        // Return the JWT as part of the response (the client can store it)
        return NextResponse.json(
            {
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    firstName: user.full_name,
                    username: user.username,
                    email: user.email,
                },
            },
            { status: 200 }
        );

    } catch ( error ) {
        console.error( 'Error logging in user:', error );
        return NextResponse.json( { message: 'Internal server error' }, { status: 500 } );
    }
}
