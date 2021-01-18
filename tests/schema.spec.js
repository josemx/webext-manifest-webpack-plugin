import validate from 'schema-utils';

import schema from '../src/schema.json';
import { SCHEMA_CONFIG as config } from '../src/constants';

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

  it('should invalidate with only target option', () => {
    const options = {
      target: 'chrome',
    };
    expect(() => {
      validate(schema, options, config);
    }).toThrow();
  });

  it('should invalidate with only vendors option', () => {
    const options = {
      vendors: './path/to/json',
    };
    expect(() => {
      validate(schema, options, config);
    }).toThrow();
  });

  it('should validate with target and vendor option', () => {
    const options = {
      target: 'firefox',
      vendors: { firefox: {} },
    };
    expect(() => {
      validate(schema, options, config);
    }).not.toThrow();
  });

  it('should invalidate with unknown target option', () => {
    const options = {
      target: 'safari',
      vendors: { safari: {} },
    };
    expect(() => {
      validate(schema, options, config);
    }).toThrow();
  });

  it('should validate with partial options', () => {
    const options = {
      template: './path/to/json',
      target: 'firefox',
      vendors: './path/to/vendors',
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
