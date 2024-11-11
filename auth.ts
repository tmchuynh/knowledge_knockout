import SequelizeAdapter from "@auth/sequelize-adapter";
import dotenv from 'dotenv';
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { DataTypes, Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize( `${ process.env.DATABASE_URL }` );
const adapter = SequelizeAdapter( sequelize, {
    models: {
        User: sequelize.define( "user", {
            id: { type: DataTypes.STRING, primaryKey: true },
            name: DataTypes.STRING,
            username: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            password: DataTypes.STRING,
            email: DataTypes.STRING,
            emailVerified: DataTypes.BOOLEAN,
            phoneNumber: DataTypes.STRING,
            image: DataTypes.STRING,
            createdAt: DataTypes.TIME,
            updatedAt: DataTypes.TIME
        } ),
        Account: sequelize.define( "account", {
            id: { type: DataTypes.STRING, primaryKey: true },
            userId: DataTypes.STRING,
            providerType: DataTypes.STRING,
            providerId: DataTypes.STRING,
            accessToken: DataTypes.STRING,
            accessTokenExpires: DataTypes.DATE,
            refreshToken: DataTypes.STRING,
            refreshTokenExpires: DataTypes.DATE,
            createdAt: DataTypes.TIME,
            updatedAt: DataTypes.TIME
        } ),
        Session: sequelize.define( "session", {
            id: { type: DataTypes.STRING, primaryKey: true },
            userId: DataTypes.STRING,
            expires: DataTypes.DATE,
            sessionToken: DataTypes.STRING,
            createdAt: DataTypes.TIME,
            updatedAt: DataTypes.TIME
        } )
    },
} );

export const providers = [
    Credentials( {
        credentials: { password: { label: "Password", type: "password" } },
        authorize( c ) {
            if ( c.password !== "password" ) return null;
            return {
                id: "test",
                name: "Test User",
                email: "test@example.com",
            };
        },
    } ),
    GitHub,
];

sequelize.sync( { force: false, alter: true } );

export const { handlers, auth, signIn, signOut } = NextAuth( {
    providers,
    pages: {
        signIn: "/signin",
        error: "/error",
        signOut: "/signout"
    },
    adapter,
} );