import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();


const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE!,
    process.env.MYSQL_USER!,
    process.env.MYSQL_PASSWORD!,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        dialectModule: mysql2,
    }
);

( async () => {
    try {
        await sequelize.authenticate();
        console.log( 'Connection has been established successfully.' );
    } catch ( error ) {
        console.error( 'Unable to connect to the database:', error );
    }
} )();


export default sequelize;