import path from 'path';

import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import { execSync } from 'child_process';
import clean from 'rollup-plugin-clean';

const input = './src/index.tsx';

const external = (id) => {
  return id.startsWith('.') === false && path.isAbsolute(id) === false;
};

const extensions = ['.tsx', '.ts', '.js', '.jsx', '.es6', '.es', '.mjs'];

const babelOptions = {
  babelHelpers: 'runtime',
  extensions,
  include: ['src/**/*'],
};

const esm = './lib/index.esm.js';

const buildTypes = (options = {}) => {
  const { hook = 'generateBundle' } = options;
  return {
    name: 'build-types',
    [hook]: async () => {
      const cmdExportTypes = 'yarn export:types';
      console.log(`RUN: ${cmdExportTypes}`);
      execSync(cmdExportTypes);
      console.log(`DONE: ${cmdExportTypes}`);
    },
  };
};

export default (pkg) => [
  {
    input,
    external,
    plugins: [
      clean({
        dest: 'lib',
      }),
      peerDepsExternal(),
      // Allows node_modules resolution
      resolve({ extensions }),

      // Allow bundling cjs modules. Rollup doesn't understand cjs
      commonjs(),

      babel(babelOptions),
      replace({
        preventAssignment: true,
      }),

      terser(),
      typescript({
        // tsconfig,
        // rollupCommonJSResolveHack: false,
        // clean: true,
      }),
      buildTypes(),
    ],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
    ],
  },
  {
    input,
    plugins: [
      peerDepsExternal(),
      // Allows node_modules resolution
      resolve({ extensions }),

      // Allow bundling cjs modules. Rollup doesn't understand cjs
      commonjs(),

      babel(babelOptions),
      replace({
        preventAssignment: true,
      }),

      terser(),
      // typescript({
      //   tsconfig,
      //   // rollupCommonJSResolveHack: false,
      //   // clean: true,
      // })
    ],
    output: [
      {
        file: pkg.unpkg,
        format: 'umd',
        name: 'MonorepoHooks',
      },
    ],
  },
  {
    input,
    output: { file: esm, format: 'esm' },
    plugins: [
      peerDepsExternal(),
      // Allows node_modules resolution
      resolve({ extensions }),
      // Allow bundling cjs modules. Rollup doesn't understand cjs
      commonjs(),
      babel(babelOptions),
      json(),
      nodePolyfills(),
      replace({
        preventAssignment: true,
      }),
      terser(),
      // typescript({
      //   tsconfig,
      //   // rollupCommonJSResolveHack: false,
      //   // clean: true,
      // })
    ],
  },
  {
    input: 'lib/index.d.ts',
    output: [{ file: pkg.types, format: 'esm' }],
    plugins: [
      dts(),
    ],
  },
];
