# Babel presets for react production

This preset includes the following plugins:
* babel-plugin-react-class-display-name
* babel-plugin-react-remove-prop-types
* babel-plugin-dev-expression

### Installation

```
$ npm install babel-plugin-react-production --save-dev
```

### Usage

Add the following line to your .babelrc file:
```json
{
  "presets": ["react"],
  "env": {
    "production": {
      "presets": ["react-production"]
    }
  }
}
```
