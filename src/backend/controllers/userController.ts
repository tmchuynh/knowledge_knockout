import { generateRandomString } from '@/app/utils/regUtils';
import { User } from '../models';
import { hashPassword } from '@/app/utils/passwordUtils';
import { encryptData } from '../utils/encryptionUtils';
import dotenv from 'dotenv';
dotenv.config();

export async function addUserToDatabase(
    id: string,
    first_name: string,
    last_name: string,
    username: string,
    phone_number: string,
    password: string,
    email: string,
) {
    try {
        // If user doesn't exist, create a new entry
        const user = await User.create( {
            id,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            username: username,
            password: password,
            email: email,
            created_at: new Date(),
            updated_at: new Date(),
        } );
        console.log( "User added to database:", user );

        return user;
    } catch ( error ) {
        console.error( "Error adding user to database:", error );
        throw error;
    }
}

export async function processUser( first_name: string, last_name: string, username: string, password: string, email: string, phone_number: string ) {
    try {
        const user = await getUserByEmail( email );
        if ( !user ) {
            console.error( "User not found in database." );
            return null;
        }

        const id = generateRandomString( 3 );
        const hashedPassword = encryptData( hashPassword( password ), `${ process.env.SECRET_22 }` );

        const newUser = await addUserToDatabase( id, first_name, last_name, username, hashedPassword, phone_number, email );
        return newUser;
    } catch ( error ) {
        console.error( "Error processing user:", error );
    }
}

export async function getUserByEmail( email: string ) {
    try {
        const user = await User.findOne( { where: { email: email } } );
        return user;
    } catch ( error ) {
        console.error( "Error retrieving user by email:", error );
    }
}