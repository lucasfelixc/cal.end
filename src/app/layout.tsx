import { FunctionComponent } from "react";
import localFont from "next/font/local";
import "../styles/globals.css";

const inter = localFont({
    src: [
        {
            path: "../fonts/Inter-roman-latin.var.woff2",
            weight: "100 900",
            style: "normal",
        },
        {
            path: "../fonts/Inter-italic-latin.var.woff2",
            weight: "100 900",
            style: "italic",
        },
    ],
});

type RootLayoutProps = {
    children: React.ReactNode;
};

export const metadata = {
    title: "Calend",
    description: "Agende sem complicações",
};

const RootLayout: FunctionComponent<RootLayoutProps> = ({ children }) => (
    <html lang="en" className={inter.className}>
        <head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className="w-full flex bg-gradient-to-b from-blue-800 to-blue-400 to-80% overflow-y-auto">
            {children}
        </body>
    </html>
);

export default RootLayout;
