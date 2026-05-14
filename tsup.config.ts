import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/index.js' },
  format: ['esm', 'cjs'],
  dts: false,
  external: ['react', 'react-dom', 'lucide-react'],
  treeshake: true,
  sourcemap: true,
  clean: true,
  minify: true,
  splitting: true,
  esbuildOptions(options) {
    options.loader = { ...(options.loader ?? {}), '.png': 'dataurl' };
  },
});
