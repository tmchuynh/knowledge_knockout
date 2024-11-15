import { DecodedToken } from '@/types/interface';
import crypto, { createSign, createVerify } from 'crypto';



// Base64 URL encoding
function base64UrlEncode( str: string ): string {
    return Buffer.from( str )
        .toString( 'base64' )
        .replace( /\+/g, '-' )
        .replace( /\//g, '_' )
        .replace( /=+$/, '' );
}

// Create Basic JWT
export function signJWT( payload: object, secret: string ): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const headerBase64 = base64UrlEncode( JSON.stringify( header ) );
    const payloadBase64 = base64UrlEncode( JSON.stringify( payload ) );

    const signature = crypto
        .createHmac( 'sha256', secret )
        .update( `${ headerBase64 }.${ payloadBase64 }` )
        .digest( 'base64' )
        .replace( /\+/g, '-' )
        .replace( /\//g, '_' )
        .replace( /=+$/, '' );

    return `${ headerBase64 }.${ payloadBase64 }.${ signature }`;
}

// Verify Basic JWT
export function verifyJWT( token: string, secret: string ): DecodedToken | null {
    const [headerBase64, payloadBase64, signature] = token.split( '.' );
    if ( !headerBase64 || !payloadBase64 || !signature ) return null;

    const expectedSignature = crypto
        .createHmac( 'sha256', secret )
        .update( `${ headerBase64 }.${ payloadBase64 }` )
        .digest( 'base64' )
        .replace( /\+/g, '-' )
        .replace( /\//g, '_' )
        .replace( /=+$/, '' );

    if ( expectedSignature !== signature ) return null;

    // Decode payload
    const payload = JSON.parse( Buffer.from( payloadBase64, 'base64' ).toString() );

    if ( !payload.id ) {
        return null;
    }

    if ( payload.exp && Date.now() >= payload.exp * 1000 ) {
        console.error( 'Token has expired' );
        return null;
    }

    return payload as DecodedToken;
}

// Base64 URL decoding utility
function base64UrlDecode( str: string ): string {
    return Buffer.from( str, 'base64' ).toString();
}

// Sign using a private key
export function signJWTWithRS256( payload: object, privateKey: string ): string {
    const header = { alg: 'RS256', typ: 'JWT' };
    const headerBase64 = base64UrlEncode( JSON.stringify( header ) );
    const payloadBase64 = base64UrlEncode( JSON.stringify( payload ) );

    const sign = createSign( 'SHA256' );
    sign.update( `${ headerBase64 }.${ payloadBase64 }` );
    sign.end();
    const signature = sign.sign( privateKey, 'base64' )
        .replace( /\+/g, '-' )
        .replace( /\//g, '_' )
        .replace( /=+$/, '' );

    return `${ headerBase64 }.${ payloadBase64 }.${ signature }`;
}

// Verify the JWT using a public key
function verifyJWTWithRS256( token: string, publicKey: string ): object | null {
    const [headerBase64, payloadBase64, signature] = token.split( '.' );
    if ( !headerBase64 || !payloadBase64 || !signature ) return null;

    // Reconstruct the data to verify against
    const verify = createVerify( 'SHA256' );
    verify.update( `${ headerBase64 }.${ payloadBase64 }` );
    verify.end();

    const isValid = verify.verify( publicKey, signature.replace( /-/g, '+' ).replace( /_/g, '/' ), 'base64' );
    if ( !isValid ) {
        console.error( 'Invalid token signature' );
        return null;
    }

    // Decode the payload
    const payload = JSON.parse( base64UrlDecode( payloadBase64 ) );

    // Optional: check if the token has expired
    if ( payload.exp && Date.now() >= payload.exp * 1000 ) {
        console.error( 'Token has expired' );
        return null;
    }

    return payload;
}

