import session from 'express-session';
import sequelize from '../config/db';
const SequelizeStore = require( 'connect-session-sequelize' )( session.Store );

const secret = process.env.SECRET;

const SequelizeSessionStore = SequelizeStore( session.Store );
const store = new SequelizeSessionStore( {
    db: sequelize,
} );

export const sessionMiddleware = session( {
    secret: secret!,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24,
    },
} );

store.sync(); 