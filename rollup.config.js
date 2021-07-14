const path = require('path');
const rollupTypescript = require('@rollup/plugin-typescript');
const { uglify } = require('rollup-plugin-uglify');

/**
 * @type import('rollup').RollupOptions
 */
const config = {
  input: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    file: path.resolve(__dirname, 'dist', 'index.js'),
    format: 'cjs',
  },
  plugins: [rollupTypescript(), uglify()],
  external: ['download-git-repo', 'fs', 'path', 'ora', 'inquirer', 'commander'],
};
export default config;
