import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		open: true,
	},
	plugins: [
		react(),
		eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.ts', 'src/*.tsx', 'src/*.tsx'],
		}),
	],
});
