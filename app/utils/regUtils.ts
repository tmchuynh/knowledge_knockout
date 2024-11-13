import crypto from 'crypto';

// Helper function to validate email format
export function validateEmail( email: string ): boolean {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test( email );
}

export function generateRandomString( length: number ) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt( Math.floor( Math.random() * characters.length ) );
    }
    return result;
}

// Derive a key using PBKDF2
export function deriveKey( password: string ): string {
    return crypto.pbkdf2Sync( password, uuid( 25 ), 100000, 64, 'sha512' ).toString( 'hex' );
}

export function uuid( length: number = 16 ): string {
    return crypto.randomBytes( length ).toString( 'hex' );
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
