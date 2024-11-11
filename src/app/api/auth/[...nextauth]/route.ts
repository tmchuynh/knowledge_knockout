import sequelize from "@/backend/config/db";
import { User } from "@/backend/models";
import SequelizeAdapter from "@auth/sequelize-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import SpotifyProvider from "next-auth/providers/spotify";
import { Op } from "sequelize";
import { v4 as uuidv4 } from 'uuid';


export default NextAuth( {
    providers: [

        CredentialsProvider( {
            name: 'Credentials',
            credentials: {
                emailOrUsername: { label: 'Email or Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize( credentials ) {
                const { emailOrUsername, password } = credentials;


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

                const isValid = await bcrypt.compare( JSON.stringify( password ), user.password );
                if ( !isValid ) {
                    throw new Error( 'Invalid password' );
                }

                return {
                    id: user.id,
                    name: user.username,
                    email: user.email,
                };
            }
        } ),


        GoogleProvider( {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        } ),


        GitHubProvider( {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        } ),


        LinkedInProvider( {
            clientId: process.env.LINKEDIN_CLIENT_ID!,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
        } ),


        SpotifyProvider( {
            clientId: process.env.SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
        } ),
    ],

    adapter: SequelizeAdapter( sequelize ),

    callbacks: {
        async jwt( { token, user } ) {
            if ( user ) {
                token.id = user.id;
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
                        id: uuidv4(),
                        username: '',
                        password: '',
                        email: email || '',
                        provider: provider || '',
                        providerId,
                        firstName: "",
                        lastName: ""
                    } );

                    user.id = existingUser.id;
                    user.name = existingUser.username;
                    user.email = existingUser.email;

                    return '/complete-profile';
                } else {
                    user.id = existingUser.id;
                    user.name = existingUser.username;
                    user.email = existingUser.email;
                }
            }
            return true;
        }
    },

    pages: {
        signIn: '/auth/signin',
        newUser: '/complete-profile',
        error: '/auth/error',
    },

    session: {
        strategy: 'jwt',
    },

    secret: process.env.NEXTAUTH_SECRET,
} );