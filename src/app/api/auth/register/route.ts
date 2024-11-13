import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import bcrypt from 'bcryptjs';
import { User } from '@/backend/models';
import { uuid } from '@/app/utils/regUtils';
import sessionConfig from '@/lib/sessionConfig'; // Import reusable session configuration
import passport from 'passport';

// Utility function to wrap middleware for Next.js compatibility
function wrapMiddleware( middleware: any ) {
    return ( req: NextApiRequest, res: NextApiResponse, next: ( err?: any ) => void ) =>
        middleware( req, res, next );
}

// Create the router instance
const router = createRouter<NextApiRequest, NextApiResponse>();

// Use the reusable session configuration and passport middleware
router.use( wrapMiddleware( sessionConfig ) );
router.use( wrapMiddleware( passport.initialize() ) );
router.use( wrapMiddleware( passport.session() ) );

router.post( async ( req, res ) => {
    try {
        const { first_name, last_name, username, password, email, phone_number } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne( { where: { email } } );
        if ( existingUser ) {
            return res.status( 400 ).json( { message: 'User already exists with this email.' } );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash( password, 10 );
        const name = `${ first_name } ${ last_name }`;

        // Create a new user
        const newUser = await User.create( {
            id: uuid( 5 ),
            first_name,
            last_name,
            name,
            image: '',
            username,
            email,
            phone_number,
            password: hashedPassword,
        } );

        return res.status( 201 ).json( {
            message: 'User registered successfully!',
            user: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
            },
        } );
    } catch ( error ) {
        console.error( 'Error during user registration:', error );
        return res.status( 500 ).json( { message: 'An error occurred while registering. Please try again later.' } );
    }
} );

// Export the router handler
export const POST = router.handler();
