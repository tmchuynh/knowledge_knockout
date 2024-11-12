import { NextApiRequest, NextApiResponse } from 'next';
import passport from 'passport';
import session from 'express-session';
import setupAuthMiddleware from '@/backend/middleware/authMiddleware';

// Apply session middleware directly for integration with Passport
const sessionMiddleware = session( {
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
    },
} );

// Wrapper for middleware to be used in Next.js API routes
function runMiddleware( req: NextApiRequest, res: NextApiResponse, fn: any ) {
    return new Promise( ( resolve, reject ) => {
        fn( req, res, ( result: any ) => {
            if ( result instanceof Error ) {
                return reject( result );
            }
            return resolve( result );
        } );
    } );
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
    // Only allow GET requests
    if ( req.method !== 'GET' ) {
        res.status( 405 ).json( { message: 'Method Not Allowed' } );
    }

    try {
        // Run session middleware
        await runMiddleware( req, res, sessionMiddleware );

        // Initialize and use Passport session
        await runMiddleware( req, res, passport.initialize() );
        await runMiddleware( req, res, passport.session() );

        // Check if user is authenticated
        if ( req.isAuthenticated() ) {
            res.status( 200 ).json( { user: req.user } );
        } else {
            res.status( 401 ).json( { message: 'Not authenticated' } );
        }
    } catch ( error ) {
        console.error( 'Error retrieving session:', error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    }
}
