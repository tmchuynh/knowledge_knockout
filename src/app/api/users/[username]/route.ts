import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/backend/models';

// GET Handler
export async function GET(
    request: NextRequest,
    { params }: { params: { username: string; }; }
) {
    const { username } = await params;

    try {
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

// PUT Handler
export async function PUT( req: NextRequest ) {
    try {
        // Parse the request body
        const { id, username, email, image } = await req.json();

        if ( !id && !username ) {
            return NextResponse.json(
                { error: 'User ID or username is required to update user information' },
                { status: 400 }
            );
        }

        // Find the user by ID or username
        const user = await User.findOne( {
            where: id ? { id } : { username },
        } );

        if ( !user ) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Update the fields only if provided
        const updatedFields: Partial<{ email: string; image: string; }> = {};
        if ( email ) updatedFields.email = email;
        if ( image ) updatedFields.image = image;

        // Check if there are fields to update
        if ( Object.keys( updatedFields ).length === 0 ) {
            return NextResponse.json(
                { message: 'No fields provided for update' },
                { status: 400 }
            );
        }

        // Update the user record in the database
        await user.update( updatedFields );

        // Return the updated user details (excluding sensitive fields)
        return NextResponse.json(
            {
                message: 'User information updated successfully',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    image: user.image,
                },
            },
            { status: 200 }
        );
    } catch ( error ) {
        console.error( 'Error updating user:', error );
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
