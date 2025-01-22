/* eslint-disable no-useless-escape -- Default values of vitest */
import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// eslint-disable-next-line import/no-default-export -- required by Vite
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
        exclude: [
            '**\/node_modules/**',
            '**\/dist/**',
            '**\/cypress/**',
            '**\/.{idea,git,cache,output,temp}/**',
            '**\/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
            './src/tests/**',
        ],
        coverage: {
            reporter: ['lcov', 'html'],
            exclude: [
                'node_modules',
                './src/tests/**',
            ],
        },
    },
});
