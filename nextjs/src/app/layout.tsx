import './globals.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AxiomWebVitals } from 'next-axiom';

import { Analytics } from '@vercel/analytics/react';

import ThemeProvider from '~/components/molecules/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    metadataBase: new URL('https://blog.MKSingh.in'),
    title: 'MKSingh | Blog Home Page',
    description: 'Official website of MKSingh',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <link rel="shortcut icon" href="/icon.png" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
            </head>
            <body className={`${inter.className} overflow-x-hidden`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <AxiomWebVitals />
                    <Analytics />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
