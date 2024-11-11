import SequelizeAdapter, { models } from "@auth/sequelize-adapter";
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
            ...models.User,
            phoneNumber: DataTypes.STRING,
        } ),
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
sequelize.sync();

export const { handlers, auth, signIn, signOut } = NextAuth( {
    providers,
    pages: {
        signIn: "/signin",
        error: "/error",
        signOut: "/signout"
    },
    adapter,
} );