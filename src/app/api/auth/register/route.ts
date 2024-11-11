import type { NextApiRequest, NextApiResponse } from 'next';
import { processUser } from '@/backend/controllers/userController';

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
    if ( req.method !== 'POST' ) {
        return res.status( 405 ).json( { message: 'Method not allowed' } );
    }

    const { first_name, last_name, username, password, email, phone_number } = req.body;

    if ( !first_name || !last_name || !username || !password || !email || !phone_number ) {
        return res.status( 400 ).json( { message: 'All fields are required' } );
    }

    try {
        const newUser = await processUser( first_name, last_name, username, password, email, phone_number );

        if ( !newUser ) {
            return res.status( 400 ).json( { message: 'User could not be created. Possible duplicate email.' } );
        }

        res.status( 201 ).json( { message: 'User registered successfully', user: newUser } );
    } catch ( error ) {
        console.error( 'Error registering user:', error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    }
}
