import crypto from 'crypto';

// Create JWT
export function signJWT( payload: object, secret: string ): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const headerBase64 = Buffer.from( JSON.stringify( header ) ).toString( 'base64' );
    const payloadBase64 = Buffer.from( JSON.stringify( payload ) ).toString( 'base64' );

    const signature = crypto
        .createHmac( 'sha256', secret )
        .update( `${ headerBase64 }.${ payloadBase64 }` )
        .digest( 'base64' );

    return `${ headerBase64 }.${ payloadBase64 }.${ signature }`;
}

// Verify JWT
export function verifyJWT( token: string, secret: string ): boolean {
    const [headerBase64, payloadBase64, signature] = token.split( '.' );
    const expectedSignature = crypto
        .createHmac( 'sha256', secret )
        .update( `${ headerBase64 }.${ payloadBase64 }` )
        .digest( 'base64' );

    return expectedSignature === signature;
}

