# Web Extension Manifest Webpack Plugin

## Installation

```shell
$ npm install webext-manifest-webpack-plugin --save-dev
```

## Usage

In `webpack.config.js`

```javascript
import WebExtManifestWebpackPlugin from 'webext-manifest-webpack-plugin';

const config = {
  ...,
  plugins: [
    new WebExtManifestWebpackPlugin(options),
  ],
};
```

If the key `webext` is defined in `package.json` they will be included

## Options

| Name         | Type             | Default         | Description                                                                                                                             |
| ------------ | ---------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `template`   | `string\|object` | `{}`            | `string` is a path to a `json` file with additional/override keys for the manifest. An `object` can be used for the same functionality. |
| `target`     | `string`         | `''`            | If defined it will use `vendors` to add specific keys to the final manifest.                                                            |
| `vendors`    | `string\|object` | `{}`            | `string` is a path to a `json` file with vendor specific keys. As with `template` an `object` can be used for the same functionality.   |
| `outputPath` | `string`         | `config output` | A path to where the `manifest.json` will be saved. By default it will use the same output path defined in the webpack config            |
| `filename`   | `string`         | `manifest.json` | Used to optionally change the name of the manifest file                                                                                 |

## Examples

```javascript
new WebExtManifestWebpackPlugin();
```

Will generate a manifest with the keys that vendors require. The values will be taken from the projects `package.json`.

```json
{
  "manifest_version": 2,
  "name": "okeh",
  "version": "1.0.0",
  "author": "Titus Trebuchet"
}
```

---

```javascript
new WebExtManifestWebpackPlugin({
  template: {
    name: 'Awesome Extension',
    background: {
      scripts: ['background.js'],
    },
  },
});
```

Using the previous example's state and the template option. Will result in:

```json
{
  "manifest_version": 2,
  "name": "Awesome Extension",
  "version": "1.0.0",
  "author": "Titus Trebuchet",
  "background": {
    "scripts": ["background.js"]
  }
}
```
