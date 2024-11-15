import bcrypt from 'bcrypt'; // Assuming bcrypt is used for password hashing
import { Request, Response } from 'express';
import User from '../models/User';
import { hashPassword } from '@/utils/passwordUtils';
import { toTitleCase } from '@/utils/formatUtils';
import { uuid } from '@/utils/regUtils';

export const getUserProfile = async ( req: Request, res: Response ) => {
    try {
        const userId = parseInt( req.params.id );
        const user = await User.findByPk( userId );

        if ( !user ) {
            return res.status( 404 ).json( { error: 'User not found' } );
        }

        res.json( {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.created_at,
        } );
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Error retrieving user profile' } );
    }
};


// Register user with local credentials
export const registerUser = async ( req: Request, res: Response ): Promise<void> => {
    const { username, email, full_name, password } = req.body;

    try {
        // Hash the password before storing it
        const hashedPassword = hashPassword( password );

        // Create a new user in the database
        const newUser = await User.create( {
            id: uuid( 5 ),
            full_name: toTitleCase( full_name ),
            username,
            password_hash: hashedPassword,
            email,
            created_at: new Date(),
        } );

        res.status( 201 ).json( { message: 'Registration successful', user: newUser } );
    } catch ( error ) {
        console.error( 'Error registering user:', error );
        res.status( 500 ).json( { message: 'Error registering user' } );
    }
};


export const loginUser: ( req: Request, res: Response ) => Promise<void> = async ( req, res ) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne( { where: { username } } );
        if ( !user ) {
            res.status( 404 ).json( { message: 'User not found' } );
        }

        const isPasswordValid = await bcrypt.compare( password, user?.password! );
        if ( !isPasswordValid ) {
            res.status( 401 ).json( { message: 'Unauthorized' } );
        }

        res.status( 200 ).json( { message: 'Login successful' } );
    } catch ( error ) {
        console.error( 'Error logging in user:', error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    }
};
