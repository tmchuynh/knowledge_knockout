import crypto from 'crypto';

// Generate a random 256-bit (32-byte) secret key in hexadecimal
const secret = crypto.randomBytes( 32 ).toString( 'hex' );
console.log( secret );
