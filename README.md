# Ember-prism

This project aims to make re-usable ember components for [PrismJS](http://prismjs.com/).
This project is packaged as an [EmberCLI](http://www.ember-cli.com) addon.

## Installation

Install the ember-cli addon in your ember-cli project:

```
$ ember install ember-prism
```

## Usage

### Using components

We have two main components, `code-block`, and `code-inline`. They'll take care of running Prism on your code as you transition.

You may need to use `&lt;`, and `&gt;` html attributes to escape `<`, and `>` characters so they aren't removed by Handlebars.

```handlebars
{{#code-block language='markup'}}//Can be left blank for the default
  &lt;a href='link'&gt;value&lt;/a&gt;
{{/code-block}}
```

### Configuration

You can set which theme, components, and plugins you'd like to use from Prism.

```javascript
//Brocfile.js
var app = new EmberApp({
  'ember-prism': {
    'theme': 'twilight',
    'components': ['scss', 'javascript'], //needs to be an array, or undefined.
    'plugins': ['line-highlight']
  }
})
```

If you want to use the default theme, just remove the `theme` option completely.

## Running Locally

* Run `ember server` from `tests/dummy`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Contribution

Yes please.
