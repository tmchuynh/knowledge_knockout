import NextAuth from 'next-auth';
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import User from '../../../../backend/models/User';
import sequelize from '@sequelize/core';
import { Op } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

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
                        [Op.or]: [
                            { email: emailOrUsername as string },
                            { username: emailOrUsername as string },
                        ],
                    },
                } );

                if ( !user ) {
                    throw new Error( 'No user found with the given email or username' );
                }

                // Compare passwords
                const isValid = await bcrypt.compare( JSON.stringify( password ), user.password );
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
            if ( token && session.user ) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
            }
            return session;
        },
        async signIn( { user, account } ) {
            if ( account?.provider !== 'credentials' ) {
                const provider = account?.provider;
                const providerId = account?.providerAccountId.toString();
                const email = user.email;

                let existingUser = await User.findOne( {
                    where: { email: email || '' },
                } );

                if ( !existingUser ) {
                    existingUser = await User.create( {
                        user_id: uuidv4(),
                        username: '',
                        password: '',
                        email: email || '',
                        provider: provider || '',
                        providerId,
                        firstName: "",
                        lastName: ""
                    } );

                    user.id = existingUser.user_id;
                    user.name = existingUser.username;
                    user.email = existingUser.email;

                    return '/complete-profile';
                } else {
                    user.id = existingUser.user_id;
                    user.name = existingUser.username;
                    user.email = existingUser.email;
                }
            }
            return true;
        }
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
