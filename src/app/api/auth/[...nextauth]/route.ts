import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/backend/models"; // Import your Sequelize model
import bcrypt from "bcrypt";
import { Op } from "sequelize";

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
                    throw new Error( "Invalid password" );
                }

                // Return the user object with id as a string, name, and email
                return {
                    id: user.id, // Ensure id is returned as a string
                    name: user.username, // Make sure these fields exist in the User model
                    email: user.email,
                };
            },
        } ),
    ],

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
