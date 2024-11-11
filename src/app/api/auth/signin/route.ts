import type { NextApiRequest, NextApiResponse } from 'next';
import { checkPassword, getUserByEmail } from '@/backend/controllers/userController';
import { signJWT } from '@/backend/utils/jwtUtils';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
    if ( req.method === 'POST' ) {
        const { email, password } = req.body;
        try {
            const user = await getUserByEmail( email );
            if ( user && await checkPassword( password ) ) {
                const payload = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                };

                const token = signJWT( payload, process.env.JWT_SECRET! );

                return res.status( 200 ).json( { token } );
            } else {
                return res.status( 401 ).json( { message: 'Invalid email or password.' } );
            }
        } catch ( error ) {
            console.error( 'Error in authentication:', error );
            return res.status( 500 ).json( { message: 'Internal server error' } );
        }
    } else {
        res.setHeader( 'Allow', ['POST'] );
        res.status( 405 ).end( `Method ${ req.method } Not Allowed` );
    }
}
