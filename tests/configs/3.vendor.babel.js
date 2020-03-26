import path from 'path';
import WebExtManifestWebpackPlugin from '../../src';

// firefox vendor test
const config = {
  mode: 'development',
  entry: path.join(__dirname, './index.js'),
  output: {
    path: path.join(__dirname, '/out'),
    filename: 'out.js',
  },
  plugins: [
    new WebExtManifestWebpackPlugin({
      target: 'firefox',
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
