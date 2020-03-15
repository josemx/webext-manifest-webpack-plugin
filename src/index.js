import { readJSON, merge } from './utils';
import pluginDefaults from './defaults';

const logPluginError = e =>
  console.error('[webext-manifest-webpack-plugin]', e);

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
  const keys = readJSON('./package.json')
    .then(getPackageKeys)
    .catch(logPluginError);

  // keys from template
  const template =
    typeof defaults.options !== 'string'
      ? defaults.options
      : readJSON(defaults.options).catch(logPluginError);

  Promise.all([defaults.manifest, keys, template])
    .then(manifestObjectArray => {
      console.log('defaults.manifest', defaults.manifest);
      console.log('keys', keys);
      console.log('template', template);
      const manifestObject = merge(manifestObjectArray);
      console.log('manifestObject', manifestObject);
      callback();
    })
    .catch(logPluginError);
};

const apply = (defaults, callback) => compiler =>
  compiler.plugin('emit', callback(defaults));

const WebExtManifestWebpackPlugin = () => ({
  apply: apply(pluginDefaults, pluginCallback),
});

export default WebExtManifestWebpackPlugin;
