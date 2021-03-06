import path from 'path';
import WebExtManifestWebpackPlugin from '../../src';

// template as object test
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
        manifest_version: 2,
        author: 'Test Tester',
        from_template_test: 'obj',
      },
    }),
  ],
};

export default config;
