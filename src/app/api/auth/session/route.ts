import { createRouter } from 'next-connect';
import passport from 'passport';
import sessionConfig from '@/lib/sessionConfig';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { User } from '@/backend/models';

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
        return NextResponse.json( { user: req.user } );
    } else {
        return NextResponse.json( { user: new User } );
    }
} );

export default router.handler();
