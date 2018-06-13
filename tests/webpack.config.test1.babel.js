import path from 'path';
import WebExtManifestWebpackPlugin from '../src';

const config = {
  entry: './tests/index.js',
  output: {
    path: path.join(__dirname, '../tests'),
    filename: 'out.js',
  },
  plugins: [
    new WebExtManifestWebpackPlugin({
      fromPKG: true,
      template: {
        manifest_version: 2,
        author: 'Test Tester',
        from_template_test: 'obj',
      },
    }),
  ],
};

export default config;
