import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'index.js',
  output: {
    dir: './dist',
    format: 'cjs',
  },
  plugins: [
    resolve({ preferBuiltins: true, }),
    commonjs(),
  ]
}
