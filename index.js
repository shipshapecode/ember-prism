/* eslint-env node */
'use strict';

var fs = require('fs');

module.exports = {
  name: 'ember-prism',
  included(app) {
    /*
     * If included by an addon rather than the root app, there will be no import method,
     * so it's that addon's responsibility to call importPrismSources instead.
     */
    if (!app.import) { return; }

    importPrismSources(app, app.options['ember-prism']);
  },

  importPrismSources: importPrismSources
};

/**
 * Imports all necessary Prism source styling and JS into the including app. This function
 * is a public hook for addons that wish to use ember-prism within their own components.
 */
function importPrismSources(app, givenOptions) {
  var options = givenOptions || {};

  //import theme based on options
  if (options.theme){
    // allow ability to specify no css if we want to provide our own
    if (options.theme !== 'none'){
      app.import(app.bowerDirectory + '/prism/themes/prism-' + options.theme + '.css');
    }
  } else {
    // fall back to default theme
    app.import(app.bowerDirectory + '/prism/themes/prism.css');
  }

  //import main javascript
  app.import(app.bowerDirectory + '/prism/prism.js');

  //import components
  if (options.components){
    options.components.forEach(function(component){
      app.import(app.bowerDirectory + '/prism/components/prism-' + component + '.js');
    });
  }

  // import plugins
  if (options.plugins){
    options.plugins.forEach(function(plugin){

      /**
       * Most Prism plugins contains both a js file and a css file, but there
       * are exception. `highlight-keywords` for instance, does not have a
       * css file.
       *
       * When the plugin is imported, the app should check for file existence
       * before calling `app.import()`.
       */

      // file extensions to be tested for existence.
      var fileExtensions = ['js', 'css'];

      fileExtensions.forEach(function(fileExtension) {
        var file = app.bowerDirectory + '/prism/plugins/' + plugin + '/prism-' + plugin + '.' + fileExtension;

        if (fs.existsSync(file)) {
          app.import(file);
        }
      });

    });
  }
}
