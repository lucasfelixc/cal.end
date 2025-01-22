/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const tailwindAnimate = require('tailwindcss-animate');

module.exports = {
    darkMode: ['class'],
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: 'true',
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                primary: {
                    50: '#fef1f8',
                    100: '#fee5f2',
                    200: '#fecce6',
                    300: '#ffa2d2',
                    400: '#fd69b1',
                    500: '#f72585',
                    600: '#e81a6e',
                    700: '#ca0c54',
                    800: '#a70d45',
                    900: '#8b103c',
                    950: '#550220',
                },
                secondary: {
                    50: '#f4f1ff',
                    100: '#ebe6ff',
                    200: '#d9d0ff',
                    300: '#bdabff',
                    400: '#9e7bff',
                    500: '#8146ff',
                    600: '#7320ff',
                    700: '#650ff2',
                    800: '#550ccb',
                    900: '#480ca8',
                    950: '#290471',
                },
                tertiary: {
                    50: '#f1fafe',
                    100: '#e1f4fd',
                    200: '#bde9fa',
                    300: '#83d9f6',
                    400: '#4cc9f0',
                    500: '#18afdf',
                    600: '#0b8dbe',
                    700: '#0a719a',
                    800: '#0d5f7f',
                    900: '#114f69',
                    950: '#0b3246',
                },
            },
            fontFamily: {
                sans: ['Inter var, sans-serif', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0',
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                    to: {
                        height: '0',
                    },
                },
                wiggle: {
                    '0%, 40%, 70%, 100%': {
                        transform: 'scale(1)',
                    },
                    '50%, 80%': {
                        transform: 'scale(1.2)',
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                wiggle: 'wiggle 1.5s ease-in-out infinite',
            },
            spacing: {
                128: '32rem',
            },
        },
    },
    plugins: [tailwindAnimate],
};
