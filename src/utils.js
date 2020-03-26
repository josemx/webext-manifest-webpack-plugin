import { resolve, dirname } from 'path';
import validate from 'schema-utils';
import { promises as fsPromises } from 'fs';

import schema from './schema.json';
import { SCHEMA_CONFIG, PLUGIN_NAME } from './constants';

export const throwPluginError = e => {
  throw new Error(`[${PLUGIN_NAME}] ${e}`);
};

export const readJSON = path =>
  fsPromises
    .readFile(resolve(path), 'utf8')
    .then(contents => JSON.parse(contents))
    .catch(throwPluginError);

export const writeJSON = (path, obj) =>
  fsPromises
    .mkdir(dirname(path), { recursive: true })
    .then(() =>
      fsPromises.writeFile(resolve(path), JSON.stringify(obj, null, 2), 'utf8')
    )
    .catch(throwPluginError);

export const merge = objArray =>
  objArray.reduce((acc, obj) => ({ ...acc, ...obj }), {});

export const extract = (keyMap, obj) => {
  const pkgKeys = keyMap.reduce((acc, key) => {
    if (typeof key === 'string') return { ...acc, [key]: obj[key] || '' };
    const [nKey, mKey] = key;
    return { ...acc, [nKey]: obj[mKey] || '' };
  }, {});
  return obj.webext ? { ...pkgKeys, ...obj.webext } : pkgKeys;
};

export const validateOptions = options => {
  try {
    validate(schema, options, SCHEMA_CONFIG);
  } catch (e) {
    throwPluginError(e);
  }
};
