
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { User } from '@/backend/models';

passport.use(
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        async ( username: string, password: string, done: ( error: any, user?: any, options?: { message: string; } ) => void ) => {
            try {
                const user = await User.findOne( { where: { username } } );
                if ( !user ) {
                    return done( null, false, { message: 'Incorrect username.' } );
                }

                const isPasswordValid = await bcrypt.compare( password, user.password );
                if ( !isPasswordValid ) {
                    return done( null, false, { message: 'Incorrect password.' } );
                }

                return done( null, user );
            } catch ( error ) {
                return done( error );
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
    } catch ( error ) {
        done( error );
    }
} );

export default passport;
