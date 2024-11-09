
// Helper function to validate email format
export function validateEmail( email: string ): boolean {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test( email );
}

// Show error for a specific field
export function showError( elementId: string, message: string ): void {
    const element = document.getElementById( elementId ) as HTMLInputElement;
    if ( element ) {
        element.classList.add( "border-red-500" );
    }
    alert( message ); // Replace with custom error handling if preferred
}

// Generate a random unique ID (example function)
export function generateUniqueId(): string {
    return `id_${ Math.random().toString( 36 ).substring( 2, 9 ) }`;
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
