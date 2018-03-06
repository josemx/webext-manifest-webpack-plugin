import fs from 'fs';

const readFileAsync = (path, options) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, options, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

export { readFileAsync }; /* eslint "import/prefer-default-export": "off" */
