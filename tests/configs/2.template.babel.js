import path from 'path';
import WebExtManifestWebpackPlugin from '../../src';

// template as path test
const config = {
  mode: 'development',
  entry: path.join(__dirname, './index.js'),
  output: {
    path: path.join(__dirname, '/out'),
    filename: 'out.js',
  },
  plugins: [
    new WebExtManifestWebpackPlugin({
      template: './tests/configs/template.json',
      outputPath: path.join(__dirname, 'out/different/path'),
    }),
  ],
};

export default config;
