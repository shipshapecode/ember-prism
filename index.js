/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-prism',
  included: function(app) {
    //default theme name is 'default'
    var options = app.options['ember-prism'] || { components: [] };

    //import main stylesheet
    app.import(app.bowerDirectory + '/prism/themes/prism.css');

    //import theme based on options
    if (options.theme){
      app.import(app.bowerDirectory + '/prism/themes/prism-' + options.theme + '.css');
    } else {
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
  }
};
