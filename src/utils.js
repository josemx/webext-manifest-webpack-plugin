import { resolve } from 'path';
import { promises as fsPromises } from 'fs';

export const readJSON = path =>
  fsPromises
    .readFile(resolve(path), 'utf8')
    .then(contents => JSON.parse(contents))
    .catch(console.error);

export const merge = objArray =>
  objArray.reduce((acc, obj) => ({ ...acc, ...obj }), {});
