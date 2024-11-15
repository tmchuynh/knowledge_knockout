import '../models';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';
import { Sequelize } from 'sequelize';
dotenv.config();


const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE!,
    process.env.MYSQL_USER!,
    process.env.MYSQL_PASSWORD!,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        dialectModule: mysql2,
        logging: false,
    }
);


export default sequelize;
