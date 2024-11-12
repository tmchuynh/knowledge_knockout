import express from 'express';
import next from 'next';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import sequelize from './config/db';
import setupPassport from './config/passport';
import userRouter from './routes/userRoutes';
import leaderboardRouter from './routes/leaderboardRoute';
import quizRouter from './routes/quizRoutes';
import setupAssociations, { Quiz, User } from './associations';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next( { dev } );
const handle = app.getRequestHandler();

const PORT = process.env.MYSQL_PORT || 5000;

app.prepare().then( () => {
    const server = express();

    // Initialize Passport configuration
    setupPassport( passport );

    // Middleware for parsing JSON and URL-encoded data
    server.use( express.json( { limit: '1mb' } ) );
    server.use( express.urlencoded( { extended: true, limit: '1mb' } ) );

    // Setup session middleware
    server.use(
        session( {
            secret: process.env.SESSION_SECRET || 'your-secret-key',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: !dev, // Use secure cookies in production
                httpOnly: true,
            },
        } )
    );

    // Initialize Passport.js middleware
    server.use( passport.initialize() );
    server.use( passport.session() );

    // Database connection test
    sequelize.authenticate()
        .then( () => console.log( 'Database connected...' ) )
        .catch( ( err: Error ) => console.error( 'Database connection error:', err ) );

    server.use( '/api/users', userRouter );
    server.use( '/api/quiz', quizRouter );
    server.use( '/api/leaderboard', leaderboardRouter );

    // Handle all other routes with Next.js
    server.all( '*', ( req, res ) => {
        return handle( req, res );
    } );

    console.log( 'User model:', User );
    console.log( 'Quiz model:', Quiz );

    setupAssociations();

    // Sync database
    sequelize.sync( { alter: true } ).then( () => {
        console.log( 'Database synchronized' );
    } ).catch( error => {
        console.error( 'Error during database synchronization:', error );
    } );

    server.listen( PORT, () => {
        console.log( `Server running on http://localhost:${ PORT }` );
    } );
} ).catch( ( err ) => {
    console.error( 'Error preparing Next.js:', err );
} );
