import NextAuth, { NextAuthConfig } from "next-auth";
import NextAuthOptions from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import SpotifyProvider from "next-auth/providers/spotify";
import bcrypt from "bcrypt";
import sequelize from "@/backend/config/db";
import { Op } from "sequelize";
import SequelizeAdapter from "@auth/sequelize-adapter";
import { uuid } from "@/app/utils/regUtils";
import { NextRequest } from "next/server";
import { Awaitable } from "@auth/core/types";
import { User } from "@/backend/models";
import { adapter } from "../../../../../auth";

export default NextAuth( {
    providers: [
        CredentialsProvider( {
            name: "Credentials",
            credentials: {
                emailOrUsername: { label: "Email or Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize( credentials ) {
                const { emailOrUsername, password } = credentials;

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
                    throw new Error( "No user found with the given email or username" );
                }

                // Compare passwords
                const isValid = await bcrypt.compare( JSON.stringify( password ), user.password );
                if ( !isValid ) {
                    throw new Error( 'Invalid password' );
                }

                // Return user object if authorized
                return { id: user.id, name: user.username, email: user.email };
            },
        } ),

        // GoogleProvider( {
        //     clientId: process.env.GOOGLE_CLIENT_ID!,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        // } ),

        // GitHubProvider( {
        //     clientId: process.env.GITHUB_CLIENT_ID!,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        // } ),

        // LinkedInProvider( {
        //     clientId: process.env.LINKEDIN_CLIENT_ID!,
        //     clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
        // } ),

        // SpotifyProvider( {
        //     clientId: process.env.SPOTIFY_CLIENT_ID!,
        //     clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
        // } ),
    ],

    adapter: adapter,

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
            if ( account?.provider !== "credentials" ) {
                const email = user.email;
                const name = user.name;

                let existingUser = await User.findOne( {
                    where: { email: email || '' },
                } );

                if ( !existingUser ) {
                    existingUser = await User.create( {
                        id: uuid( 4 ),
                        username: "",
                        name: name || "",
                        first_name: "",
                        last_name: "",
                        password: "",
                        email: email || "",
                    } );


                    user.id = existingUser.id;
                    user.name = existingUser.name;
                    user.email = existingUser.email;
                    await existingUser.save(); // Save user to database

                    return "/complete-profile"; // Redirect to profile completion
                } else {
                    user.id = existingUser.id;
                    user.name = existingUser.username;
                    user.email = existingUser.email;
                }
            }
            return true;
        },
    },

    pages: {
        signIn: "/signin",
        newUser: "/complete-profile",
        error: "/error",
    },

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,
} );

// Named exports for GET and POST
export const GET = ( req: NextAuthConfig | ( ( request: NextRequest | undefined ) => Awaitable<NextAuthConfig> ) ) => NextAuth( req );
export const POST = ( req: NextAuthConfig | ( ( request: NextRequest | undefined ) => Awaitable<NextAuthConfig> ) ) => NextAuth( req );
