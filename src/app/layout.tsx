import {FunctionComponent} from 'react';
import localFont from 'next/font/local';
import '../styles/globals.css';

const inter = localFont({
    src: [
        {
            path: '../fonts/Inter-roman-latin.var.woff2',
            weight: '100 900',
            style: 'normal',
        },
        {
            path: '../fonts/Inter-italic-latin.var.woff2',
            weight: '100 900',
            style: 'italic',
        },
    ],
});

type RootLayoutProps = {
  children: React.ReactNode,
};

export const metadata = {
    title: 'Helpflix',
    description: 'Make the world a better place',
};

const RootLayout: FunctionComponent<RootLayoutProps> = ({children}) => (
    <html lang="en" className={inter.className}>
        <head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className="w-full h-full sm:h-screen">{children}</body>
    </html>
);

export default RootLayout;
