import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/utils/jwtUtils';
import { User } from '@/backend/models';
import dotenv from 'dotenv';

dotenv.config();

export async function GET( req: NextRequest ) {
    try {
        // Extract the token from cookies
        const token = req.cookies.get( 'token' )?.value;
        if ( !token ) {
            return NextResponse.json( { message: 'Token is missing' }, { status: 401 } );
        }

        // Verify the JWT and get the decoded token
        const decodedToken = verifyJWT( token, `${ process.env.JWT_SECRET }` );
        if ( !decodedToken ) {
            return NextResponse.json( { message: 'Invalid token' }, { status: 401 } );
        }

        // Find the user in the database based on the ID from the token
        const user = await User.findOne( { where: { id: decodedToken.id } } );
        if ( !user ) {
            return NextResponse.json( { message: 'User not found' }, { status: 404 } );
        }

        // Return user details (excluding sensitive information)
        return NextResponse.json( {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.full_name,
            image: user.image,
        } );
    } catch ( error ) {
        console.error( 'Error verifying user:', error );
        return NextResponse.json( { message: 'Internal server error' }, { status: 500 } );
    }
}
