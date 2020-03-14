import validate from 'schema-utils';

import schema from '../src/schema.json';
import config from '../src/option.config';

describe('options schema', () => {
  it('should validate with empyt options', () => {
    const options = {};
    expect(() => {
      validate(schema, options, config);
    }).not.toThrow();
  });

  it('should invalidate with unrecognized options', () => {
    const options = { dneOption: true };
    expect(() => {
      validate(schema, options, config);
    }).toThrowError(/WebExtManifestWebpackPlugin/);
  });

  it('should validate with string template option', () => {
    const options = { template: './path/to/json' };
    expect(() => {
      validate(schema, options, config);
    }).not.toThrow();
  });

  it('should validate with object template option', () => {
    const options = {
      template: { key: 'value' },
    };
    expect(() => {
      validate(schema, options, config);
    }).not.toThrow();
  });

  it('should validate with target option', () => {
    const options = {
      target: 'chrome',
    };
    expect(() => {
      validate(schema, options, config);
    }).not.toThrow();
  });

  it('should validate with string vendors option', () => {
    const options = {
      vendors: './path/to/json',
    };
    expect(() => {
      validate(schema, options, config);
    }).not.toThrow();
  });

  it('should validate with object template option', () => {
    const options = {
      template: { key: 'value' },
    };
    expect(() => {
      validate(schema, options, config);
    }).not.toThrow();
  });

  it('should validate with partial options', () => {
    const options = {
      template: './path/to/json',
      target: 'firefox',
    };
    expect(() => {
      validate(schema, options, config);
    }).not.toThrow();
  });

  it('should validate with full options', () => {
    const options = {
      template: './path/to/json',
      target: 'chrome',
      vendors: { key: 'value' },
    };
    expect(() => {
      validate(schema, options, config);
    }).not.toThrow();
  });
});
