import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import sessionConfig from '@/lib/sessionConfig'; // Import the reusable session configuration
import passport from 'passport';

// Utility function to wrap middleware for Next.js compatibility
function wrapMiddleware( middleware: any ) {
    return ( req: NextApiRequest, res: NextApiResponse, next: ( err?: any ) => void ) =>
        middleware( req, res, next );
}

const router = createRouter<NextApiRequest, NextApiResponse>();

// Use the reusable session configuration and passport middleware
router.use( wrapMiddleware( sessionConfig ) );
router.use( wrapMiddleware( passport.initialize() ) );
router.use( wrapMiddleware( passport.session() ) );

// Handle logout GET request
router.get( ( req, res ) => {
    req.logout( ( err ) => {
        if ( err ) {
            console.error( 'Error during logout:', err );
            return res.status( 500 ).json( { message: 'Error during logout' } );
        }
        res.status( 200 ).json( { message: 'Logged out successfully' } ); // Return a success message or redirect as needed
    } );
} );

// Export the router handler
export const GET = router.handler();
