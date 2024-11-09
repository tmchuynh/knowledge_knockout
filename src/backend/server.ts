import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './models/Score';
import './models/Quiz';
import sequelize from './config/db';
import userRoutes from './routes/userRoutes';
import setupAssociations from './associations';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use( express.json() );
app.use( cors() );

// Database connection test
sequelize
    .authenticate()
    .then( () => console.log( 'Database connected...' ) )
    .catch( ( err: Error ) => console.error( 'Database connection error:', err ) );


sequelize.sync( { force: false } )
    .then( () => console.log( 'Database synced' ) )
    .catch( ( err: Error ) => console.error( 'Database sync error:', err ) );


// Attach routes
app.use( '/api/users', userRoutes );

app.use( ( err: Error, _req: express.Request, res: express.Response ) => {
    console.error( err.stack );
    res.status( 500 ).send( 'Something broke!' );
} );


setupAssociations();

// Start the server
app.listen( PORT, () => {
    console.log( `Server running on http://localhost:${ PORT }` );
} );
