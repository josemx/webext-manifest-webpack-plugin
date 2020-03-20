import { readJSON, merge } from '../src/utils';

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
