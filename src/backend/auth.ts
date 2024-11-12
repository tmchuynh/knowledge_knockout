import { hashPassword } from "@/app/utils/passwordUtils";
import { getUserByEmail } from "@/backend/controllers/userController";
import SequelizeAdapter from "@auth/sequelize-adapter";
import dotenv from 'dotenv';
import Credentials from "next-auth/providers/credentials";
import { DataTypes } from "sequelize";
import NextAuth, { AuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

const sequelize = require( '@/backend/config/db' ).default;

dotenv.config();

// Define the models
export const adapter = SequelizeAdapter( sequelize, {
    models: {
        User: sequelize.define( "user", {
            user_id: {
                type: DataTypes.STRING,
                field: 'user_id',
            },
            name: DataTypes.STRING,
            username: {
                type: DataTypes.STRING,
                field: 'username',
            },
            firstName: {
                type: DataTypes.STRING,
                field: 'first_name',
            },
            lastName: {
                type: DataTypes.STRING,
                field: 'last_name',
            },
            password: DataTypes.STRING,
            email: DataTypes.STRING,
            emailVerified: DataTypes.BOOLEAN,
            phoneNumber: DataTypes.STRING,
            image: DataTypes.STRING,
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
        } ),
        Account: sequelize.define( "account", {
            id: { type: DataTypes.STRING, primaryKey: true },
            user_id: {
                type: DataTypes.STRING,
                field: 'user_id',
            },
            providerType: DataTypes.STRING,
            providerId: DataTypes.STRING,
            accessToken: DataTypes.STRING,
            accessTokenExpires: DataTypes.DATE,
            refreshToken: DataTypes.STRING,
            refreshTokenExpires: DataTypes.DATE,
        } ),
        Session: sequelize.define( "session", {
            id: { type: DataTypes.STRING, primaryKey: true },
            user_id: {
                type: DataTypes.STRING,
                field: 'user_id',
            },
            expires: DataTypes.DATE,
            sessionToken: DataTypes.STRING,
        } ),
    },
} );

// Sync the models (you can add options like `force: false` or `alter: true`)
sequelize.sync( { alter: true } ).then( () => {
    console.log( "Database & tables created!" );
} );

// Configure NextAuth
export const { handlers, signIn, signOut, auth } = NextAuth( {
    providers: [
        Credentials( {
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async ( credentials ) => {
                if ( !credentials || typeof credentials.email !== 'string' || typeof credentials.password !== 'string' ) {
                    throw new Error( "Invalid credentials." );
                }

                let user = null;

                // Hash the password
                const pwHash = hashPassword( credentials.password );

                // Verify if the user exists
                user = await getUserByEmail( credentials.email );

                if ( !user ) {
                    throw new Error( "Invalid credentials." );
                }

                // Return user object with their profile data
                return user;
            },
        } ),
    ],
    callbacks: {
        async session( { session, token }: { session: Session; token: JWT; } ) {
            if ( token ) {
                session.user = {
                    ...session.user,
                    id: token.sub,
                };
            }
            return session;
        },
    }
} );
