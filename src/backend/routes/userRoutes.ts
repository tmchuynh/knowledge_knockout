import { Router } from 'express';
import UserAttributes from '../models/User';
import { NextResponse } from 'next/server';
const userRouter = Router();

// // Route for login
// userRouter.post(
//     '/login',
//     passport.authenticate( 'local', { failureRedirect: '/signin' } ),
//     ( req: Request, res: Response, next: NextFunction ): void => {
//         console.log( 'Login successful for user:', req.user );
//         const user = req.user as UserAttributes;

//         if ( req.user && user.id ) {
//             // Redirect to the dashboard if user is authenticated
//             res.redirect( `/app/${ user.id }/dashboard` );
//         } else {
//             console.error( 'User ID not found during login' );
//             // Return a JSON response with an error message
//             res.status( 500 ).json( { message: 'User ID not found' } );
//         }

//         // Call next() to end the middleware chain
//         next();
//     }
// );

// Dashboard route
userRouter.get( '/dashboard', ( req, res ) => {
    const user = req.user as UserAttributes;
    if ( req.isAuthenticated() ) {
        console.log( 'User is authenticated:', user.id );
        res.send( `Hello, ${ user.first_name }. Welcome to your dashboard!` );
    } else {
        console.log( 'User is not authenticated' );
        res.redirect( '/signin' );
    }
} );

// Logout route
userRouter.get( '/logout', ( req, res ) => {
    req.logout( ( err ) => {
        if ( err ) {
            console.error( 'Error during logout:', err );
            return NextResponse.json( { message: 'Error during logout' } );
        }
        console.log( 'User logged out successfully' );
        res.redirect( '/signout' );
    } );
} );

// Route for fetching user by ID
userRouter.get( '/:id', ( req, res ) => {
    const userId = req.params.id;
    console.log( 'Fetching user by ID:', userId );
    // Add your logic to fetch user data
    res.redirect( `/user/${ userId }` );
} );

// Route for user activity
userRouter.get( '/:id/activity', ( req, res ) => {
    const userId = req.params.id;
    console.log( 'Fetching activity for user ID:', userId );
    // Add logic to fetch user activity
    res.redirect( `/${ userId }/activity` );
} );

// Route for user progress
userRouter.get( '/:id/progress/:quiz/:level', ( req, res ) => {
    const { quiz, level, id } = req.params;
    console.log( `Fetching progress for user ID: ${ id }, quiz: ${ quiz }, level: ${ level }` );
    // Add logic to fetch progress data
    res.redirect( `/quiz/${ quiz }/${ level }` );
} );

export default userRouter;
