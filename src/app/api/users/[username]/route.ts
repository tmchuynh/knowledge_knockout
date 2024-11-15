import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/backend/models';

// GET Handler
export async function GET(
    request: NextRequest,
    { params }: { params: { username: string; }; }
) {
    const { username } = params;

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
export async function PUT( req: Request ) {
    try {
        const { username, email, image } = await req.json();

        if ( !username ) {
            return NextResponse.json(
                { error: 'Username is required to update user information' },
                { status: 400 }
            );
        }

        const user = await User.findOne( { where: { username } } );

        if ( !user ) {
            return NextResponse.json( { error: 'User not found' }, { status: 404 } );
        }

        // Prepare the updated fields
        const updatedFields: Partial<{ email: string; image: string; }> = {};
        if ( email ) updatedFields.email = email;
        if ( image ) updatedFields.image = image;

        // Update the user record
        await user.update( updatedFields );

        return NextResponse.json(
            { message: 'User information updated successfully', user },
            { status: 200 }
        );
    } catch ( error ) {
        console.error( 'Error updating user:', error );
        return NextResponse.json( { error: 'Internal server error' }, { status: 500 } );
    }
}
