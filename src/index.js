import pluginDefaults from './defaults';
import { PLUGIN_NAME, KEYMAP, MANIFEST_FILE } from './constants';
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

  const vendorsDefined = options.target || options.vendors;
  const getVendorKeys = vendorsOption =>
    typeof vendorsOption !== 'string'
      ? options.vendors[options.target]
      : readJSON(options.vendors).then(
          vendorsObj => vendorsObj[options.target]
        );
  const vendorKeys = vendorsDefined ? getVendorKeys(options.vendors) : [];

  Promise.all([defaults.manifest, keys, template, vendorKeys])
    .then(manifestObjectArray => {
      const manifestObject = merge(manifestObjectArray);
      const { outputPath = compilation.options.output.path } = options;
      const { filename = MANIFEST_FILE } = options;
      return writeJSON(`${outputPath}/${filename}`, manifestObject);
    })
    .then(() => callback());
};

const pluginApply = (defaults, options, callback) => compiler =>
  compiler.hooks.afterEmit.tapAsync(PLUGIN_NAME, callback(defaults, options));

const WebExtManifestWebpackPlugin = (options = {}) => ({
  apply: pluginApply(pluginDefaults, options, pluginCallback),
});

export default WebExtManifestWebpackPlugin;
