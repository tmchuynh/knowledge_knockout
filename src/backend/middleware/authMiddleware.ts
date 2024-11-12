import passport from 'passport';
import session from 'express-session';
import { NextApiRequest, NextApiResponse } from 'next';

const sessionMiddleware = session( {
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        httpOnly: true,
    },
} );

export default function setupAuthMiddleware( handler: ( req: NextApiRequest, res: NextApiResponse ) => Promise<void> | void ) {
    return async ( req: NextApiRequest, res: NextApiResponse ) => {
        try {
            // Initialize session
            await new Promise<void>( ( resolve, reject ) => {
                sessionMiddleware( req as any, res as any, ( err ) => ( err ? reject( err ) : resolve() ) );
            } );

            // Initialize Passport
            passport.initialize()( req as any, res as any, () => {
                passport.session()( req as any, res as any, () => {
                    // Execute the provided handler
                    handler( req, res );
                } );
            } );
        } catch ( error ) {
            console.error( 'Error in middleware:', error );
            res.status( 500 ).json( { message: 'Middleware error', error: error instanceof Error ? error.message : 'Unknown error' } );
        }
    };
}
