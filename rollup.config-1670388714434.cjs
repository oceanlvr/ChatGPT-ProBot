'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var resolve = require('@rollup/plugin-node-resolve');
var commonjs = require('@rollup/plugin-commonjs');
var terser = require('@rollup/plugin-terser');

var rollup_config = {
  input: 'index.js',
  output: {
    dir: './dist',
    format: 'cjs',
  },
  plugins: [
    resolve({ preferBuiltins: true, }),
    commonjs(),
    terser()
  ],
};

exports.default = rollup_config;
