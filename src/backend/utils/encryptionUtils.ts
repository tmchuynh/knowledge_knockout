import crypto from 'crypto';

// Encrypt data
export function encryptData( data: string, secretKey: string ): string {
    const iv = crypto.randomBytes( 16 ); // Initialization vector
    const cipher = crypto.createCipheriv( 'aes-256-cbc', Buffer.from( secretKey, 'utf-8' ), iv );
    let encrypted = cipher.update( data, 'utf-8', 'hex' );
    encrypted += cipher.final( 'hex' );
    return iv.toString( 'hex' ) + ':' + encrypted;
}

// Decrypt data
export function decryptData( encryptedData: string, secretKey: string ): string {
    const [ivHex, encrypted] = encryptedData.split( ':' );
    const iv = Buffer.from( ivHex, 'hex' );
    const decipher = crypto.createDecipheriv( 'aes-256-cbc', Buffer.from( secretKey, 'utf-8' ), iv );
    let decrypted = decipher.update( encrypted, 'hex', 'utf-8' );
    decrypted += decipher.final( 'utf-8' );
    return decrypted;
}
