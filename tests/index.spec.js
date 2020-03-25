import WebExtManifestWebpackPlugin from '../src';

describe('webext manifest webpack plugin', () => {
  it('should create a new instance', () => {
    const plugin = new WebExtManifestWebpackPlugin();
    expect(plugin).toBeInstanceOf(Object);
  });
});
