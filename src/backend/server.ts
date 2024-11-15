import express from 'express';
import next from 'next';
import dotenv from 'dotenv';
import sequelize from './config/db';
import userRouter from './routes/userRoutes';
import progressRouter from './routes/progressRoutes';
import scoreRouter from './routes/scoreRoutes';
import setupAssociations from './associations';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next( { dev } );
const handle = app.getRequestHandler();

const PORT = process.env.MYSQL_PORT || 5000;

app.prepare().then( () => {
    const server = express();

    // Middleware for parsing JSON and URL-encoded data
    server.use( express.json( { limit: '1mb' } ) );
    server.use( express.urlencoded( { extended: true, limit: '1mb' } ) );

    // Database connection test
    sequelize.authenticate()
        .then( () => console.log( 'Database connected...' ) )
        .catch( ( err: Error ) => console.error( 'Database connection error:', err ) );

    // Use routers for different API routes
    server.use( '/api/users', userRouter );
    server.use( '/api/progress', progressRouter );
    server.use( '/api/scores', scoreRouter );

    // Handle all other routes with Next.js
    server.all( '*', ( req, res ) => {
        return handle( req, res );
    } );

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
