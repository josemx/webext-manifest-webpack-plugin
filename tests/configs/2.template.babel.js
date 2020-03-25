import path from 'path';
import WebExtManifestWebpackPlugin from '../../src';

// template as path test
const config = {
  mode: 'development',
  entry: path.join(__dirname, './index.js'),
  output: {
    path: path.join(__dirname, '../../tests'),
    filename: 'out.js',
  },
  plugins: [
    new WebExtManifestWebpackPlugin({
      template: './tests/configs/template.json',
    }),
  ],
};

export default config;
