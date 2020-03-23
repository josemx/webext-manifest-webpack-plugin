import path from 'path';
import WebExtManifestWebpackPlugin from '../../src';

console.log(__dirname);

const config = {
  mode: 'development',
  entry: path.join(__dirname, './index.js'),
  output: {
    path: path.join(__dirname, '../../tests'),
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
