import { resolve } from 'path';
import { promises as fsPromises } from 'fs';

const ERRTAG = '[webext-manifest-webpack-plugin]';

const readJSON = path =>
  fsPromises
    .readFile(resolve(path), 'utf8')
    .then(contents => JSON.parse(contents));

const defaultOptions = () => ({
  template: {},
  fromPKG: false,
  target: '',
  vendors: {},
});

const defaultManifest = () => ({
  manifest_version: 2,
  name: '',
  author: '',
});

const pluginCallback = self => (compilation, callback) => {
  // keys from packgage.json
  const defaultKeys = readJSON('./package.json')
    .then(obj => ({
      name: obj.name || '',
      version: obj.version || '',
      author: obj.author || '',
      description: obj.description || '',
      homepage_url: obj.homepage || '',
      ...(obj.webext || {}),
    }))
    .catch(e => console.error(`${ERRTAG} :: ${e}`));

  // keys from template
  let { template } = self.options;
  if (typeof template === 'string') {
    // if the template is a string read the files contents and reassign
    template = readJSON(template).catch(e =>
      console.error(`${ERRTAG} :: ${e}`)
    );
  }

  Promise.all([self.defaultManifest, defaultKeys, template])
    .then(manifestObjectArray => {
      console.log('defaultKeys', defaultKeys);
      console.log('template', template);
      const manifestObject = manifestObjectArray.reduce(
        (acc, cur) => ({
          ...acc,
          ...cur,
        }),
        {}
      );
      console.log('manifestObject', manifestObject);
      callback();
    })
    .catch(e => console.error(`${ERRTAG} :: ${e}`));
};

const apply = (self, callback) => compiler =>
  compiler.plugin('emit', callback(self));

const WebExtManifestWebpackPlugin = () => ({
  apply: apply(
    {
      options: defaultOptions(),
      defaultManifest: defaultManifest(),
    },
    pluginCallback
  ),
});

export default WebExtManifestWebpackPlugin;
