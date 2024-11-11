import SequelizeAdapter from "@auth/sequelize-adapter";
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "@/backend/config/db";

dotenv.config();

// Define the models
export const adapter = SequelizeAdapter( sequelize, {
    models: {
        User: sequelize.define( "user", {
            id: { type: DataTypes.STRING, primaryKey: true },
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
        } ),
        Session: sequelize.define( "session", {
            id: { type: DataTypes.STRING, primaryKey: true },
            userId: DataTypes.STRING,
            expires: DataTypes.DATE,
            sessionToken: DataTypes.STRING,
        } )
    },
} );

// Sync the models (you can add options like `force: false` or `alter: true`)
sequelize.sync( { force: false, alter: true } ).then( () => {
    console.log( "Database & tables created!" );
} );

// Define the authentication providers
export const providers = [
    CredentialsProvider( {
        credentials: { password: { label: "Password", type: "password" } },
        async authorize( credentials ) {
            if ( credentials?.password !== "password" ) return null;
            return {
                id: "test",
                name: "Test User",
                email: "test@example.com",
            };
        },
    } ),
    GitHubProvider( {
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    } ),
];

// Configure NextAuth
export const { handlers, auth, signIn, signOut } = NextAuth( {
    providers,
    pages: {
        signIn: "/signin",
        error: "/error",
        signOut: "/signout",
    },
    adapter,
} );
