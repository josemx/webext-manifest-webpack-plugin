import { readJSON, writeJSON, merge, extract } from './utils';
import * as pluginDefaults from './defaults';

const pluginCallback = defaults => (compilation, callback) => {
  // keys from packgage.json
  const keys = readJSON('./package.json').then(pkg =>
    extract(defaults.keyMap, pkg)
  );

  // keys from template
  const template =
    typeof defaults.options.template !== 'string'
      ? defaults.options.template
      : readJSON(defaults.options.template);

  Promise.all([defaults.manifest, keys, template])
    .then(manifestObjectArray => {
      const manifestObject = merge(manifestObjectArray);
      console.log(manifestObject);
      return writeJSON(`${__dirname}/../test.json`, manifestObject);
    })
    .then(() => callback());
};

const pluginApply = (defaults, callback) => compiler =>
  compiler.hooks.afterEmit.tapAsync(
    'webext-manifest-plugin',
    callback(defaults)
  );

const WebExtManifestWebpackPlugin = () => ({
  apply: pluginApply(pluginDefaults, pluginCallback),
});

export default WebExtManifestWebpackPlugin;
