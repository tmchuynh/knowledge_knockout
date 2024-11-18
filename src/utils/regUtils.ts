import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

// Helper function to validate email format
export function validateEmail( email: string ): boolean {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test( email );
}

// Derive a key using PBKDF2
export function deriveKey( password: string ): string {
    return crypto.pbkdf2Sync( password, uuid( 25 ), 100000, 64, 'sha512' ).toString( 'hex' );
}

export function uuid( length: number = 16 ): string {
    return crypto.randomBytes( length ).toString( 'hex' );
}

export function generateRandomString( desiredLength: number ): string {
    // Generate the first character as an uppercase letter (A-Z)
    const firstChar = String.fromCharCode( 65 + Math.floor( Math.random() * 26 ) );

    // Generate a UUID and remove dashes, convert to uppercase
    const uuid = uuidv4().replace( /-/g, '' ).toUpperCase();

    // Get a random substring of the UUID with the specified length
    const startIdx = Math.floor( Math.random() * ( 32 - desiredLength ) );
    const uuidPart = uuid.substring( startIdx, startIdx + desiredLength );

    // Concatenate the first character with the rest of the UUID part and return
    return firstChar + uuidPart;
}

// Registration validation function
export async function validateRegistrationForm(
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    registerData: { [key: string]: string; }
): Promise<boolean> {
    const { firstName, lastName, email, username, password, confirmPassword } = registerData;

    if ( !firstName || !lastName || !email || !username || !password || !confirmPassword ) {
        setErrorMessage( "All fields are required." );
        return false;
    }

    if ( !validateEmail( email ) ) {
        setErrorMessage( "Invalid email address." );
        return false;
    }

    if ( password !== confirmPassword ) {
        setErrorMessage( "Passwords do not match." );
        return false;
    }

    // Assuming passwords are stored as hashes, include hashing here if needed
    return true;
}
