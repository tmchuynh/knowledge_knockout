
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { User } from '@/backend/models';

passport.use(
    new LocalStrategy( async ( username, password, done ) => {
        try {
            const user = await User.findOne( { where: { username } } );
            if ( !user ) {
                return done( null, false, { message: 'Incorrect username.' } );
            }

            const isValid = await bcrypt.compare( password, user.password );
            if ( !isValid ) {
                return done( null, false, { message: 'Incorrect password.' } );
            }

            return done( null, user );
        } catch ( err ) {
            return done( err );
        }
    } )
);

passport.serializeUser( ( user: any, done ) => {
    done( null, user.id );
} );

passport.deserializeUser( async ( id: number, done ) => {
    try {
        const user = await User.findByPk( id );
        if ( user ) {
            done( null, user );
        } else {
            done( new Error( 'User not found' ), null );
        }
    } catch ( err ) {
        done( err, null );
    }
} );

export default passport;
