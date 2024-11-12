import { createRouter } from 'next-connect';
import passport from 'passport';
import { NextApiRequest, NextApiResponse } from 'next';
import setupAuthMiddleware from '@/backend/middleware/authMiddleware';

const router = createRouter<NextApiRequest, NextApiResponse>();

// Apply Passport.js middleware using next-connect
router.use( ( req, res, next ) => setupAuthMiddleware( ( req, res ) => next() )( req, res ) );

// Handle login POST request
router.post(
    passport.authenticate( 'local', {
        failureRedirect: '/signin', // Redirect to /signin on failure
    } ),
    ( req, res ) => {
        // Custom success handling
        if ( req.user && req.user.id ) {
            res.redirect( `/app/${ req.user.id }/dashboard` );
        } else {
            res.status( 500 ).json( { message: 'User ID not found' } );
        }
    }
);

// Handle session check for authenticated user (GET request)
router.get( '/session', ( req, res ) => {
    if ( req.isAuthenticated() ) {
        res.status( 200 ).json( { user: req.user } );
    } else {
        res.status( 401 ).json( { message: 'User not authenticated' } );
    }
} );

// Logout route
router.get( '/logout', ( req, res ) => {
    req.logout( ( err ) => {
        if ( err ) {
            console.error( 'Error during logout:', err );
            return res.status( 500 ).json( { message: 'Error during logout' } );
        }
        // Redirect to the /signout page after successful logout
        res.redirect( '/signout' );
    } );
} );

// Export the handlers for GET and POST
export const GET = router.handler();
export const POST = router.handler();
