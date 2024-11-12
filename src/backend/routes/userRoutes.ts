import { Router } from 'express';
import passport from 'passport';
import UserAttributes from '../models/User';

const userRouter = Router();

userRouter.post(
    '/login',
    passport.authenticate( 'local', {
        failureRedirect: '/signin',
    } ),
    ( req, res ) => {
        const user = req.user as UserAttributes;
        if ( req.user && user.id ) {
            res.redirect( `/app/${ user.id }/dashboard` );
        } else {
            res.status( 500 ).json( { message: 'User ID not found' } );
        }
    }
);

userRouter.get( '/dashboard', ( req, res ) => {
    const user = req.user as UserAttributes;
    if ( req.isAuthenticated() ) {
        res.send( `Hello, ${ user.first_name }. Welcome to your dashboard!` );
    } else {
        res.redirect( '/signin' );
    }
} );

userRouter.get( '/logout', ( req, res ) => {
    req.logout( ( err ) => {
        if ( err ) {
            console.error( 'Error during logout:', err );
            res.status( 500 ).json( { message: 'Error during logout' } );
        }
        res.redirect( '/signout' );
    } );
} );

// Route: /api/users/[id]
userRouter.get( '/:id', ( req, res ) => {
    const userId = req.params.id;
    // Logic to fetch and return user data by ID
    res.redirect( `/user/ ${ userId }` );
} );

// Route: /api/users/activity
userRouter.get( '/:id/activity', ( req, res ) => {
    // Logic to fetch user activity data
    const userId = req.params.id;
    res.redirect( `/ ${ userId }/activity` );
} );

// Route: /api/users/[id]/progress/[quiz]/[level]
userRouter.get( '/:id/progress/:quiz/:level', ( req, res ) => {
    const { quiz, level, id } = req.params;
    // Logic to fetch user progress for the quiz and level
    res.redirect( `/quiz/${ quiz }/${ level }` );
} );

export default userRouter;
