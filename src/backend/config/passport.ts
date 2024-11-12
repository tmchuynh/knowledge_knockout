import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User'; // Adjust path as needed
import bcrypt from 'bcryptjs';

const setupPassport = ( passport: passport.PassportStatic ) => {
    passport.use(
        new LocalStrategy(
            { usernameField: 'email', passwordField: 'password' },
            async ( email, password, done ) => {
                try {
                    const user = await User.findOne( { where: { email } } );
                    if ( !user ) {
                        return done( null, false, { message: 'Incorrect email.' } );
                    }

                    const isMatch = await bcrypt.compare( password, user.password );
                    if ( !isMatch ) {
                        return done( null, false, { message: 'Incorrect password.' } );
                    }

                    return done( null, user );
                } catch ( err ) {
                    return done( err );
                }
            }
        )
    );

    passport.serializeUser( ( user: any, done ) => {
        done( null, user.id );
    } );

    passport.deserializeUser( async ( id: string, done ) => {
        try {
            const user = await User.findByPk( id );
            done( null, user );
        } catch ( err ) {
            done( err );
        }
    } );
};

export default setupPassport;
