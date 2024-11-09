// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import User from '../../../../backend/models/User';
import sequelize from '@sequelize/core';

export const authOptions: NextAuthConfig = {
    providers: [
        CredentialsProvider( {
            name: 'Credentials',
            credentials: {
                emailOrUsername: { label: 'Email or Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize( credentials ) {
                const { emailOrUsername, password } = credentials!;

                // Find user by email or username
                const user = await User.findOne( {
                    where: {
                        [sequelize.Sequelize.Op.or]: [
                            { email: emailOrUsername },
                            { username: emailOrUsername },
                        ],
                    },
                } );

                if ( !user ) {
                    throw new Error( 'No user found with the given email or username' );
                }

                // Compare passwords
                const isValid = bcrypt.compare( password, user.password );
                if ( !isValid ) {
                    throw new Error( 'Invalid password' );
                }

                // Return user object
                return {
                    id: user.user_id,
                    name: user.username,
                    email: user.email,
                };
            },
        } ),
    ],
    callbacks: {
        async jwt( { token, user } ) {
            if ( user ) {
                token.id = user.id; // user.id is user.user_id
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session( { session, token } ) {
            if ( token ) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth( authOptions );
