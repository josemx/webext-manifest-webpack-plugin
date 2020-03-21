import pluginDefaults from './defaults';
import { PLUGIN_NAME, KEYMAP } from './constants';
import { readJSON, writeJSON, merge, extract, validateOptions } from './utils';

const pluginCallback = (defaults, options) => (compilation, callback) => {
  // validate options
  validateOptions(options);

  // keys from packgage.json
  const keys = readJSON('./package.json').then(pkg => extract(KEYMAP, pkg));

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

const pluginApply = (defaults, options, callback) => compiler =>
  compiler.hooks.afterEmit.tapAsync(PLUGIN_NAME, callback(defaults, options));

const WebExtManifestWebpackPlugin = (options = {}) => ({
  apply: pluginApply(pluginDefaults, options, pluginCallback),
});

export default WebExtManifestWebpackPlugin;
