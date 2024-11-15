import { Request, Response, RequestHandler } from 'express';
import { User } from '@/backend/models';


export const getUser: RequestHandler = async ( req, res ) => {
    try {
        const { id, username } = req.query;

        if ( !id && !username ) {
            res.status( 400 ).json( { message: 'User ID or username is required' } );
            return;
        }

        const user = await User.findOne( {
            where: id ? { id } : { username },
            attributes: { exclude: ['password'] },
        } );

        if ( !user ) {
            res.status( 404 ).json( { message: 'User not found' } );
            return;
        }

        res.status( 200 ).json( user );
    } catch ( error ) {
        console.error( 'Error fetching user:', error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    }
};


export const updateUser: RequestHandler = async ( req, res ) => {
    try {
        const { id } = req.body;
        const { username, email, image } = req.body;

        if ( !id ) {
            res.status( 400 ).json( { message: 'User ID is required to update user information' } );
            return;
        }

        const user = await User.findByPk( id );

        if ( !user ) {
            res.status( 404 ).json( { message: 'User not found' } );
            return;
        }


        const updatedFields: Partial<{ username: string; email: string; image: string; }> = {};
        if ( username ) updatedFields.username = username;
        if ( email ) updatedFields.email = email;
        if ( image ) updatedFields.image = image;

        await user.update( updatedFields );

        res.status( 200 ).json( { message: 'User updated successfully', user } );
    } catch ( error ) {
        console.error( 'Error updating user:', error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    }
};
