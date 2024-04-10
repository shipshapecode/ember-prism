# ember-prism

<a href="https://shipshape.io/"><img src="http://i.imgur.com/DWHQjA5.png" alt="Ship Shape" width="100" height="100"/></a>

**[ember-prism is built and maintained by Ship Shape. Contact us for Ember.js consulting, development, and training for your project](https://shipshape.io/ember-consulting/)**.

[![npm version](https://badge.fury.io/js/ember-prism.svg)](http://badge.fury.io/js/ember-prism)
[![npm](https://img.shields.io/npm/dm/ember-prism.svg)]()
[![Ember Observer Score](https://emberobserver.com/badges/ember-prism.svg)](https://emberobserver.com/addons/ember-prism)
[![Build Status](https://travis-ci.org/shipshapecode/ember-prism.svg?branch=master)](https://travis-ci.org/shipshapecode/ember-prism)

This project aims to make re-usable ember components for [PrismJS](http://prismjs.com/).
This project is packaged as an [EmberCLI](http://www.ember-cli.com) addon.

## Compatibility

* Ember.js v4.8 or above
* Ember CLI v4.8 or above
* Node.js v18 or above

For Ember <= 3.12 use version 0.7.0 of ember-prism.

## Installation

Install the ember-cli addon in your ember-cli project:

```shell
ember install ember-prism
```

## Usage

### Using components

We have two main components, `code-block`, and `code-inline`. They'll take care of running Prism on your code as you transition.

They accept the code to be rendered by passing a `@code` argument:

```hbs
<CodeBlock @code="<a href='link'>value</a>" @language="markup" />
```

While both variants support all features, the former is preferable when the code content is subject to changes (re-rendering).
For the latter you may need to use `&lt;`, and `&gt;` html attributes to escape `<`, and `>` characters so they aren't removed by Handlebars.

The `@language` argument is optional, and if passed should match one of Prism's [supported languages](https://prismjs.com/#supported-languages).

#### Overriding Line Numbers

If you have opted to use the `line-numbers` plugin within your `ember-cli-build.js`, then you can optionally pass in `@start` to `<CodeBlock/>` to set a custom starting line.  This is particularly useful when showing "contiguous" *hunks* of code (while not showing the *entire* code file).

(within `ember-cli-build.js`):
```js
module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    // other options
    'ember-prism': {
      plugins: ['line-numbers']
    },
  });
};
```

(in your component that renders a `<CodeBlock />`)
```hbs
<CodeBlock @code="<html lang='en'>" @start={{2}} />
```

This will result in the code block starting its line numbering from `2`, instead of `1`.

### Configuration

You can set which theme, components, and plugins you'd like to use from Prism.

```js
// ember-cli-build.js
var app = new EmberApp({
  'ember-prism': {
    'theme': 'twilight',
    'components': ['scss', 'javascript'], //needs to be an array, or undefined.
    'plugins': ['line-highlight']
  }
})
```

If you want to use the default theme, just remove the `theme` option completely.

If you want hi-fi Glimmer / Ember highlighting, specify:
```js
components: ['markup'],
```
and somewhere in your app:
```js
import { setup } from 'ember-prism';

setup();
```

## Running Locally

* Run `ember server`
* Visit your app at http://localhost:4200.

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
