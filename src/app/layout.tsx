"use client";

import dotenv from 'dotenv';
import Head from "next/head";
import React from "react";
import { NotFoundProvider, useNotFound } from "../context/NotFoundContext";
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/NavSidebar';
import './globals.css';

export default function RootLayout( {
    children,
}: {
    children: React.ReactNode;
} ) {
    dotenv.config();

    return (
        <html lang="en">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&family=PT+Sans+Narrow:wght@400;700&family=Titan+One&display=swap"
                    rel="stylesheet"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="A knowledge-based quiz game" />
                <meta title="Knowledge Knockout" />
                <title>Knowledge Knockout</title>
            </Head>
            <body>
                <NotFoundProvider>
                    <SidebarProvider>
                        <MainContent>{children}</MainContent>
                    </SidebarProvider>
                </NotFoundProvider>
            </body>
        </html>
    );
}

// Separate main content with Header
const MainContent = ( {
    children,
}: {
    children: React.ReactNode;
} ) => {
    const { isNotFound } = useNotFound();
    return (
        <>
            {!isNotFound &&
                <>
                    <AppSidebar />
                    <SidebarTrigger className='py-10 px-8' />
                </>}
            <main className='w-full m-auto py-16'>
                {children}
            </main>
        </>
    );
};
