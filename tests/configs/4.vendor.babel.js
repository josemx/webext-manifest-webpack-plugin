import path from 'path';
import WebExtManifestWebpackPlugin from '../../src';

// chrome vendor test
const config = {
  mode: 'development',
  entry: path.join(__dirname, './index.js'),
  output: {
    path: path.join(__dirname, '/out'),
    filename: 'out.js',
  },
  plugins: [
    new WebExtManifestWebpackPlugin({
      target: 'chrome',
      vendors: {
        firefox: {
          sidebar_action: {},
        },
        chrome: {
          externally_connectable: {},
        },
      },
    }),
  ],
};

export default config;
