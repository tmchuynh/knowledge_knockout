import { createRouter } from 'next-connect';
import passport from 'passport';
import sessionConfig from '@/lib/sessionConfig'; // Adjust the path as needed
import { NextApiRequest, NextApiResponse } from 'next';

// Utility to wrap express middleware for Next.js compatibility
function wrapMiddleware( middleware: any ) {
    return ( req: NextApiRequest, res: NextApiResponse, next: ( err?: any ) => void ) =>
        middleware( req, res, next );
}

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use( wrapMiddleware( sessionConfig ) );
router.use( wrapMiddleware( passport.initialize() ) );
router.use( wrapMiddleware( passport.session() ) );

router.get( ( req, res ) => {
    if ( req.isAuthenticated() ) {
        res.status( 200 ).json( { user: req.user } );
    } else {
        res.status( 401 ).json( { message: 'User not authenticated' } );
    }
} );

export default router.handler();
