import express from 'express';
import next from 'next';
import dotenv from 'dotenv';
import sequelize from './config/db';
import userRoutes from './routes/userRoutes';
import setupAssociations from './associations';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next( { dev } );
const handle = app.getRequestHandler();

const PORT = process.env.MYSQL_PORT || 5000;

app.prepare().then( () => {
    const server = express();

    server.use( express.json() );

    // Database connection test
    sequelize.authenticate()
        .then( () => console.log( 'Database connected...' ) )
        .catch( ( err: Error ) => console.error( 'Database connection error:', err ) );

    sequelize.sync( { force: false } )
        .then( () => console.log( 'Database synced' ) )
        .catch( ( err: Error ) => console.error( 'Database sync error:', err ) );

    // Attach custom routes
    server.use( '/api/users', userRoutes );

    server.use( express.json( { limit: '1mb' } ) );
    server.use( express.urlencoded( { extended: true } ) );

    // Next.js page handling
    server.all( '*', ( req, res ) => {
        return handle( req, res );
    } );

    setupAssociations();

    server.listen( PORT, () => {
        console.log( `Server running on http://localhost:${ PORT }` );
    } );
} ).catch( ( err ) => {
    console.error( 'Error preparing Next.js:', err );
} );
