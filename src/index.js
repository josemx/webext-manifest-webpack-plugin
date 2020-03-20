import { readJSON, merge } from './utils';
import pluginDefaults from './defaults';

const getPackageKeys = pkg => ({
  name: pkg.name || '',
  version: pkg.version || '',
  author: pkg.author || '',
  description: pkg.description || '',
  homepage_url: pkg.homepage || '',
  ...(pkg.webext || {}),
});

const pluginCallback = defaults => (compilation, callback) => {
  // keys from packgage.json
  const keys = readJSON('./package.json').then(getPackageKeys);

  // keys from template
  const template =
    typeof defaults.options.template !== 'string'
      ? defaults.options
      : readJSON(defaults.options.template);

  Promise.all([defaults.manifest, keys, template]).then(manifestObjectArray => {
    const manifestObject = merge(manifestObjectArray);
    console.log(manifestObject);
    callback();
  });
};

const pluginApply = (defaults, callback) => compiler =>
  compiler.plugin('emit', callback(defaults));

const WebExtManifestWebpackPlugin = () => ({
  apply: pluginApply(pluginDefaults, pluginCallback),
});

export default WebExtManifestWebpackPlugin;
