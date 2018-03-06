import path from 'path';
import { readFileAsync } from './utils';

const ERRTAG = '[webext-manifest-webpack-plugin]';

function WebExtManifestWebpackPlugin(options) {
  this.options = {
    template: options.template || {},
    fromPKG: options.fromPKG || false,
    target: options.target || '',
    vendors: options.vendors || {},
  };

  this.defaultManifest = {
    manifest_version: 2,
    name: '',
    version: '',
    author: '',
  };
}

WebExtManifestWebpackPlugin.prototype.apply = function apply(compiler) {
  compiler.plugin('emit', (compilation, callback) => {
    // keys from packgage.json
    const defautlKeys = readFileAsync(path.resolve('./package.json'), 'utf8')
      .then(contents => JSON.parse(contents))
      .then(obj => ({
        name: obj.name,
        version: obj.version,
        author: obj.author,
      }))
      .catch(e => console.error(`${ERRTAG} :: ${e}`));

    // keys from template
    let { template } = this.options;
    if (typeof template === 'string') {
      // if the template is a string read the files contents and reassign
      template = readFileAsync(path.resolve(template), 'utf8')
        .then(contents => JSON.parse(contents))
        .catch(e => console.error(`${ERRTAG} :: ${e}`));
    }

    Promise.all([this.defaultManifest, defautlKeys, template])
      .then(manifestObjectArray => {
        const manifestObject = manifestObjectArray.reduce(
          (acc, cur) => ({ ...acc, ...cur }),
          {}
        );
        console.log('manifestObject', manifestObject);
        callback();
      })
      .catch(e => console.error(`${ERRTAG} :: ${e}`));
  });
};

export default WebExtManifestWebpackPlugin;
