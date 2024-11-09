export function isValidPassword( password: string ): boolean {
    const requirements = {
        length: password.length >= 8 && password.length <= 15,
        uppercase: /[A-Z]/.test( password ),
        lowercase: /[a-z]/.test( password ),
        number: /[0-9]/.test( password ),
        special: /[!@#$%^&*(),.?":{}|<>]/.test( password ),
    };

    // Return true only if all requirements are met
    return Object.values( requirements ).every( ( value ) => value === true );
}