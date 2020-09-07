'use strict';

var fs = require('fs');

module.exports = {
  name: require('./package').name,
  included() {
    // Defaults that can be overriden by options
    this.components = [];
    this.plugins = [];
    this.theme = 'themes/prism.css';

    let app = findHost(this);

    if (app.options && app.options['ember-prism']) {
      const options = app.options['ember-prism'];
      const components = options.components;
      const plugins = (options.plugins || []);
      const theme = options.theme;

      if(!plugins.includes('normalize-whitespace')) {
        plugins.push('normalize-whitespace');
      }

      if (theme && theme !== 'none') {
        app.import(`node_modules/prismjs/themes/prism-${theme}.css`);
      } else {
        app.import(`node_modules/prismjs/themes/prism.css`);
      }

      if (components) {
        components.forEach((component) => {
          app.import(`node_modules/prismjs/components/prism-${component}.js`);
        });
      }

      if (plugins) {
        plugins.forEach((plugin) => {

          /**
           * Most Prism plugins contains both a js file and a css file, but there
           * are exception. `highlight-keywords` for instance, does not have a
           * css file.
           *
           * When the plugin is imported, the app should check for file existence
           * before calling `app.import()`.
           */

            // file extensions to be tested for existence.
          const fileExtensions = ['js', 'css'];

          fileExtensions.forEach((fileExtension) => {
            const nodeAssetsPath = `plugins/${plugin}/prism-${plugin}.${fileExtension}`;
            const file = `node_modules/prismjs/${nodeAssetsPath}`;

            if (fs.existsSync(file)) {
              app.import(file);
            }
          });

        });
      }
    }

    app.import('vendor/ember-prism.js');

    this._super.included.apply(this, arguments);
  }
};


// Polyfill [Addon._findHost](https://ember-cli.com/api/classes/Addon.html#method__findHost) for older versions of ember-cli
function findHost(addon) {
  var current = addon;
  var app;

  do {
    app = current.app || app;
  } while (current.parent.parent && (current = current.parent));

  return app;
}
