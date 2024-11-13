import crypto from 'crypto';

// Base64 URL encoding
function base64UrlEncode( str: string ): string {
    return Buffer.from( str )
        .toString( 'base64' )
        .replace( /\+/g, '-' )
        .replace( /\//g, '_' )
        .replace( /=+$/, '' );
}

// Create JWT
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

// Verify JWT
export function verifyJWT( token: string, secret: string ): boolean {
    const [headerBase64, payloadBase64, signature] = token.split( '.' );
    if ( !headerBase64 || !payloadBase64 || !signature ) return false;

    const expectedSignature = crypto
        .createHmac( 'sha256', secret )
        .update( `${ headerBase64 }.${ payloadBase64 }` )
        .digest( 'base64' )
        .replace( /\+/g, '-' )
        .replace( /\//g, '_' )
        .replace( /=+$/, '' );

    return expectedSignature === signature;
}