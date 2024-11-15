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
        const user = await User.findOne( { where: { username } } );
        if ( !user ) {
            return NextResponse.json( { message: 'User not found' }, { status: 404 } );
        }

        const isPasswordValid = await bcrypt.compare( password, user.password );
        if ( !isPasswordValid ) {
            return NextResponse.json( { message: 'Incorrect password' }, { status: 401 } );
        }

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
        };

        const token = signJWT( payload, JWT_SECRET );

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

        return response;
    } catch ( error ) {
        console.error( 'Error logging in user:', error );
        return NextResponse.json( { message: 'Internal server error' }, { status: 500 } );
    }
}
