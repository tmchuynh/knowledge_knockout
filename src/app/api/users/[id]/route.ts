import { NextResponse } from 'next/server';
import { processUser } from '../../../../backend/controllers/userController';
import { User } from '@/src/backend/models';

export async function POST( _req: Request, props: { params: Promise<{ first_name: string, last_name: string, username: string, password: string, email: string, phone_number: string; }>; } ) {

    const params = await props.params;

    try {
        const { first_name, last_name, username, password, phone_number, email } = params;

        const user = processUser( first_name, last_name, username, password, phone_number, email );
        return NextResponse.json( user );
    }
    catch ( _error ) {
        return NextResponse.json( { error: 'Internal server error' }, { status: 500 } );
    }
}


export async function GET( _req: Request, props: { params: Promise<{ username: string; }>; } ) {
    const params = await props.params;

    try {
        const { username } = params;

        if ( !username ) {
            return NextResponse.json( { error: 'Username is required' }, { status: 400 } );
        }

        const user = await User.findOne( { where: { username } } );

        return NextResponse.json( { user } );
    }
    catch ( _error ) {
        NextResponse.json( { error: 'User not found' }, { status: 404 } );
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