import path from 'path';
import WebExtManifestWebpackPlugin from '../../src';

// test including all options
const config = {
  mode: 'development',
  entry: path.join(__dirname, './index.js'),
  output: {
    path: path.join(__dirname, '/out'),
    filename: 'out.js',
  },
  plugins: [
    new WebExtManifestWebpackPlugin({
      template: {
        description: 'Override description',
      },
      target: 'firefox',
      vendors: {
        firefox: {
          sidebar_action: {},
        },
        chrome: {
          externally_connectable: {},
        },
      },
      outputPath: path.join(__dirname, '/out/another/dir'),
      filename: 'custom.json',
    }),
  ],
};

export default config;
