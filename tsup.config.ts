import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ['esm', 'cjs'],
  minify: true,
  tsconfig: 'tsconfig.build.json',
  target: 'es2021',
  dts: true,
})
