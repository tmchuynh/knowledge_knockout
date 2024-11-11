import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserByEmail } from '@/backend/controllers/userController';
import { hashPassword } from '@/app/utils/passwordUtils';

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
    if ( req.method !== 'POST' ) {
        return res.status( 405 ).json( { message: 'Method not allowed' } );
    }

    const { email, password } = req.body;

    try {
        const user = await getUserByEmail( email );
        if ( user && user.password === hashPassword( password ) ) {
            // Replace with your token generation logic or session management
            return res.status( 200 ).json( { token: 'your-auth-token' } );
        } else {
            return res.status( 401 ).json( { message: 'Invalid credentials' } );
        }
    } catch ( error ) {
        console.error( 'Error authenticating user:', error );
        return res.status( 500 ).json( { message: 'Internal server error' } );
    }
}
