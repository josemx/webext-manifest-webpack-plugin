import webpack from 'webpack';

import config1 from './configs/1.template.babel';
import config2 from './configs/2.template.babel';
import config3 from './configs/3.vendor.babel';
import config4 from './configs/4.vendor.babel';
import config5 from './configs/5.all.babel';

import WebExtManifestWebpackPlugin from '../src';

describe('webext manifest webpack plugin', () => {
  it('should create a new instance', () => {
    const plugin = new WebExtManifestWebpackPlugin();
    expect(plugin).toBeInstanceOf(Object);
  });

  it('should compile 1.template test', () => {
    expect(() => {
      webpack(config1, () => {});
    }).not.toThrow();
  });

  it('should compile 2.template test', () => {
    expect(() => {
      webpack(config2, () => {});
    }).not.toThrow();
  });

  it('should compile 3.vendor test', () => {
    expect(() => {
      webpack(config3, () => {});
    }).not.toThrow();
  });

  it('should compile 4.vendor test', () => {
    expect(() => {
      webpack(config4, () => {});
    }).not.toThrow();
  });

  it('should compile 5.all test', () => {
    expect(() => {
      webpack(config5, () => {});
    }).not.toThrow();
  });
});
