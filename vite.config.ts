import react from '@vitejs/plugin-react';
import { terser } from 'rollup-plugin-terser';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		{
			apply: 'build',
			...terser(),
		},
	],
});
