import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { User } from '@/backend/models';
import dotenv from 'dotenv';
import { signJWT } from '@/utils/jwtUtils';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST( req: NextRequest ) {
    try {
        const { username, password } = await req.json();


        if ( !username || !password ) {
            throw new Error( 'Missing credentials' );
        }

        console.log( 'Request payload:', { username, password } );


        const user = await User.findOne( { where: { username } } );
        if ( !user ) {
            console.log( 'No user found' );
            return NextResponse.json( { message: 'User not found' }, { status: 404 } );
        }

        const isPasswordValid = await bcrypt.compare( password, user.password );
        if ( !isPasswordValid ) {
            console.log( 'Incorrect password' );
            return NextResponse.json( { message: 'Incorrect password' }, { status: 401 } );
        }

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
        };

        const token = signJWT( payload, JWT_SECRET );

        // Create a single response object and set cookies
        const response = NextResponse.json( {
            message: 'Login successful',
            user: {
                id: user.id,
                firstName: user.full_name,
                username: user.username,
                email: user.email,
            },
        } );

        response.cookies.set( 'token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        } );

        return response; // Return the single response object
    } catch ( error ) {
        console.error( 'Error logging in user:', error );
        return NextResponse.json( { message: 'Internal server error' }, { status: 500 } );
    }
}
