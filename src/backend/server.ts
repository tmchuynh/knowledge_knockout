import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db';
import userRoutes from './routes/userRoutes';
import setupAssociations from './associations';
import './models';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( cors() );

// Test database connection
sequelize.authenticate()
    .then( () => console.log( 'Database connected...' ) )
    .catch( err => console.error( 'Database connection error:', err ) );

// Initialize model associations
setupAssociations();

// Sync database before starting server
app.listen( PORT, async () => {
    try {
        await sequelize.sync( { alter: true } );
        console.log( 'Database synced' );
        console.log( `Server running on http://localhost:${ PORT }` );
    } catch ( error ) {
        console.error( 'Error during sync or server start:', error );
    }
} );

// Error handling middleware
app.use( ( err: Error, req: Request, res: Response, next: NextFunction ) => {
    console.error( err.stack );
    res.status( 500 ).send( 'Something broke!' );
} );

// Routes
app.use( '/api/users', userRoutes );

export default app;
