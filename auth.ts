import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";

const authConfig: NextAuthConfig = {
    pages: {
        error: "/error",
    },
    providers: [
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
    ]
};

export const providers: Provider[] = authConfig.providers;

export const providerMap = providers
    .map( ( provider ) => {
        if ( typeof provider === "function" ) {
            const providerData = provider();
            return { id: providerData.id, name: providerData.name };
        } else {
            return { id: provider.id, name: provider.name };
        }
    } )
    .filter( ( provider ) => provider.id !== "credentials" );

export const { handlers, auth, signIn, signOut } = NextAuth( {
    providers,
    pages: {
        signIn: "/signin",
    },
} );