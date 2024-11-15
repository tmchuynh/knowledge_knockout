import { NextResponse } from 'next/server';
import { User } from '@//backend/models';
import { hashPassword } from '@/utils/passwordUtils';
import { uuid } from '@/utils/regUtils';
import { toTitleCase } from '@/utils/formatUtils';
import { NextApiResponse } from 'next';

export async function POST( _req: Request, res: NextApiResponse, props: { params: Promise<{ full_name: string, username: string, password: string, email: string; image: string; }>; } ) {

    const params = await props.params;

    try {
        const { full_name, username, password, email, image } = params;

        // Hash the password before storing it
        const hashedPassword = hashPassword( password );

        // Create a new user in the database
        const newUser = await User.create( {
            id: uuid( 5 ),
            full_name: toTitleCase( full_name ),
            username,
            password_hash: hashedPassword,
            email,
            image,
            created_at: new Date(),
        } );

        res.status( 201 ).json( { message: 'Registration successful', user: newUser } );
    }
    catch ( error ) {
        console.error( 'Error registering user:', error );
        res.status( 500 ).json( { message: 'Error registering user' } );
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