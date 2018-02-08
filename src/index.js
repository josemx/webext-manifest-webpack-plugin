function WebExtManifestWebpackPlugin(options) {}

WebExtManifestWebpackPlugin.prototype.apply = (compiler) => {
  compiler.plugin('run', (compiler, callback) => {
    console.log('\nThe webpack build process is starting!!!');

    callback();
  });
};

module.exports = WebExtManifestWebpackPlugin;
