import crypto from 'crypto';

// Use the SECRET environment variable when available; generate a random
// fallback only during local development so that the value is never
// hard-coded or leaked into version control.
export const secret: string =
    process.env.SECRET ??
    ( process.env.NODE_ENV === 'production'
        ? ( () => { throw new Error( 'SECRET environment variable must be set in production' ); } )()
        : crypto.randomBytes( 32 ).toString( 'hex' ) );
