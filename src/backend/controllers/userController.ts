import { User } from '../models';


export async function addUserToDatabase( user_id: string ) {
    try {
        // If user doesn't exist, create a new entry
        const date = new Date();
        const user = await User.create( { user_id, created_at: date } );
        console.log( "User added to database:", user );

        return user;
    } catch ( error ) {
        console.error( "Error adding user to database:", error );
        throw error;
    }
}

export async function processUser( user_id: any ) {
    try {
        // Step 1: Retrieve the user data from Auth0
        const user = await getUserById( user_id );
        if ( !user ) {
            console.error( "User not found in database." );
            return null;
        }

        // Step 2: Store or verify user in MySQL
        const newUser = await addUserToDatabase( user_id );
        return newUser;
    } catch ( error ) {
        console.error( "Error processing user:", error );
    }
}

export async function getUserById( user_id: string ) {
    try {
        const user = await User.findOne( { where: { user_id } } );
        return user;
    } catch ( error ) {
        console.error( "Error retrieving user by ID:", error );
    }
}