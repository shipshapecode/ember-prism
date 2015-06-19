/* jshint node: true */
'use strict';

var fs = require('fs');

module.exports = {
  name: 'ember-prism',
  included: function(app) {
    //default theme name is 'default'
    var options = app.options['ember-prism'] || { components: [] };

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
};
