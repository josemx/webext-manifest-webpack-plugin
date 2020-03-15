import { resolve } from 'path';
import { promises as fsPromises } from 'fs';

const readJSON = path =>
  fsPromises
    .readFile(resolve(path), 'utf8')
    .then(contents => JSON.parse(contents));

const merge = objArray =>
  objArray.reduce((acc, obj) => ({ ...acc, ...obj }), {});

export { readJSON };
export { merge };
