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
## Options
|Name|Type|Default|Description|
|----|----|-------|-----------|
|`template`|`string\|object`|`{}`|`string` is a path to a `json` file with additional/override keys for the manifest. An `object` can be used for the same functionality.|
|`fromPKG`|`boolean`|`false`|Will read from `package.json` for additional/override keys. Key in `package.json` must be defined as `webext`.|
|`target`|`string`|`''`|If defined it will use `vendors` to add specific keys to the final manifest.|
|`vendors`|`string\|object`|`{}`|`string` is a path to a `json` file with vendor specific  keys. As with `template` an `object` can be used for the same functionality.|

## Examples
```javascript
new WebExtManifestWebpackPlugin()
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
  }
})
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
