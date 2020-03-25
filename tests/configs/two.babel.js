import path from 'path';
import WebExtManifestWebpackPlugin from '../../src';

const config = {
  mode: 'development',
  entry: path.join(__dirname, './index.js'),
  output: {
    path: path.join(__dirname, '../../tests'),
    filename: 'out.js',
  },
  plugins: [
    new WebExtManifestWebpackPlugin({
      template: './tests/template.json',
    }),
  ],
};

export default config;
