import crypto from 'crypto';

export function isValidPassword( password: string ): boolean {
    const requirements = {
        length: password.length >= 8 && password.length <= 15,
        uppercase: /[A-Z]/.test( password ),
        lowercase: /[a-z]/.test( password ),
        number: /[0-9]/.test( password ),
        special: /[!@#$%^&*(),.?":{}|<>]/.test( password ),
    };

    return Object.values( requirements ).every( ( value ) => value === true );
}

export function hashPassword( password: string ): string {
    return crypto.createHash( 'sha256' ).update( password ).digest( 'hex' );
}
