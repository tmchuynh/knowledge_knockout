import session from 'express-session';
import mysql2 from 'mysql2';
import { Sequelize } from 'sequelize';
import connectSessionSequelize from 'connect-session-sequelize';

const SequelizeStore = connectSessionSequelize( session.Store );

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

const sessionStore = new SequelizeStore( {
    db: sequelize,
} );

sessionStore.sync();

const sessionMiddleware = session( {
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
} );

export default sessionMiddleware;
