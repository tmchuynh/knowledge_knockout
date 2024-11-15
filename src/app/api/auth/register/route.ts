import { User } from '@/backend/models';
import { toTitleCase } from '@/utils/formatUtils';
import { uuid } from '@/utils/regUtils';
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST( req: Request, _res: NextApiResponse ) {

    try {
        const { full_name, username, password, email, image } = await req.json();


        if ( !full_name || !username || !password || !email ) {
            return NextResponse.json( { message: 'Missing required fields' }, { status: 400 } );
        }

        // Create a new user in the database
        const newUser = await User.create( {
            id: uuid( 5 ),
            full_name: toTitleCase( full_name ),
            username,
            password,
            email,
            image: image || '',
            created_at: new Date(),
            update_at: new Date()
        } );

        return NextResponse.json( { message: 'Registration successful', user: newUser }, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error registering user:', error );
        return NextResponse.json( { message: 'Error registering user' }, { status: 500 } );
    }
};
