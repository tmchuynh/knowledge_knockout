import '../models'; 
import sequelize from './config/db';

( async () => {
    try {
        await sequelize.sync( { alter: true } );
        console.log( 'Database synced successfully' );
    } catch ( error ) {
        console.error( 'Failed to sync database:', error );
    } finally {
        await sequelize.close(); 
    }
} )();
