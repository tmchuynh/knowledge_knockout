import { createRouter } from 'next-connect';
import passport from 'passport';
import sessionConfig from '@/lib/sessionConfig'; // Adjust the path as needed
import { NextApiRequest, NextApiResponse } from 'next';

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

// Handle login POST request
router.post(
    passport.authenticate( 'local', {
        failureRedirect: '/signin', // Redirect on authentication failure
    } ),
    ( req, res ) => {
        if ( req.user && req.user.id ) {
            res.redirect( `/app/${ req.user.id }/dashboard` ); // Redirect to the dashboard on success
        } else {
            res.status( 500 ).json( { message: 'User ID not found' } );
        }
    }
);

// Export the router handler for both GET and POST
export const POST = router.handler();
export const GET = router.handler();
