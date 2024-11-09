// src/routes/userRoutes.ts
import express from 'express';

const router = express.Router();

/**
 * Route to get user profile by ID.
 */
// router.get( '/:id/dashboard', async ( userId: string ) => {

//     try {
//         if ( !userId ) {
//             console.error( "User not found in database." );
//             const newUser = addUserToDatabase( userId );
//             console.log( "User added to database:", newUser );
//             return null;
//         }

//         const user = await getUserById( userId );
//         return user;
//     } catch ( error ) {
//         console.error( 'Error retrieving user profile:', error );
//     }
// } );

export default router;
