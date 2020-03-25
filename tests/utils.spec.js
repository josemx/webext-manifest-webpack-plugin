import { readJSON, merge, extract } from '../src/utils';
import { keyMap } from '../src/defaults';

const mockPackage = {
  name: 'myExt',
  version: '1.0.0',
  author: 'Madonna',
  description: 'A test',
  homepage: 'http://www.hello.io',
};

describe('readJSON function', () => {
  it("should read this modules' package.json", async () => {
    const packageJSONPath = `${__dirname}/../package.json`;
    const packageObject = await readJSON(packageJSONPath);
    expect(packageObject).toHaveProperty('repository');
  });

  it('should throw a tagged error', async () => {
    const pathDNE = 'dne/file.json';
    await expect(readJSON(pathDNE)).rejects.toThrow(
      /webext-manifest-webpack-plugin/
    );
  });
});

describe('merge function', () => {
  it.each([
    [[{ a: 1 }, { b: 2 }], { a: 1, b: 2 }],
    [[{ a: { b: 1 }, b: 2 }, { c: 3 }], { a: { b: 1 }, b: 2, c: 3 }],
    [[{ a: '1', c: [3] }, { b: true }], { a: '1', b: true, c: [3] }],
  ])('should merge an array of objects into one', (objArray, expected) => {
    expect(merge(objArray)).toEqual(expected);
  });
});

describe('extract function', () => {
  it('should return an object with empty strings', () => {
    const obj = extract(keyMap, {});
    const expected = {
      name: '',
      version: '',
      author: '',
      description: '',
      homepage_url: '',
    };

    expect(obj).toEqual(expected);
  });

  it('should match mock package values', () => {
    const extraced = extract(keyMap, mockPackage);
    expect(Object.values(mockPackage).sort()).toEqual(
      Object.values(extraced).sort()
    );
  });

  it('should match mock package with webext key', () => {
    const webext = {
      description: 'Another test',
      default_local: 'en',
    };
    const withWebExtKey = {
      ...mockPackage,
      webext,
    };

    const expected = {
      ...mockPackage,
      ...webext,
    };

    const extracted = extract(keyMap, withWebExtKey);
    expect(Object.values(expected).sort()).toEqual(
      Object.values(extracted).sort()
    );
  });
});
