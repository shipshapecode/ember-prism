/* eslint-env node */
'use strict';

var fs = require('fs');
var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-prism',

  treeForVendor(vendorTree) {
    let prismFiles = ['prism.js', this.theme].concat(this.components, this.plugins);
    var prismTree = new Funnel(path.dirname(require.resolve('prismjs/prism.js')), {
      files: prismFiles,
    });

    return new MergeTrees([vendorTree, prismTree]);
  },

  included(app, parentAddon) {
    // Quick fix for add-on nesting
    // https://github.com/aexmachina/ember-cli-sass/blob/v5.3.0/index.js#L73-L75
    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && (app.app || app.parent)) {
      app = app.app || app.parent;
    }

    // if app.import and parentAddon are blank, we're probably being consumed by an in-repo-addon
    // or engine, for which the "bust through" technique above does not work.
    if (typeof app.import !== 'function' && !parentAddon) {
      if (app.registry && app.registry.app) {
        app = app.registry.app;
      }
    }

    // Per the ember-cli documentation
    // http://ember-cli.com/extending/#broccoli-build-options-for-in-repo-addons
    var target = (parentAddon || app);

    const modulesPath = this.project.nodeModulesPath;
    const prismModulePath = `${modulesPath}/prismjs`;

    // Defaults that can be overriden by options
    this.components = [];
    this.plugins = [];
    this.theme = `themes/prism.css`;

    if (target.options && target.options['ember-prism']) {
      const options = target.options['ember-prism'];
      const components = options.components;
      const plugins = options.plugins;
      const theme = options.theme;

      if (theme && theme !== 'none') {
        let themePath = `themes/prism-${theme}.css`;
        let file = `${prismModulePath}/${themePath}`;
        if (fs.existsSync(file)) {
          this.theme = themePath;
        }
      }

      if (components) {
        components.forEach((component) => {
          let componentPath = `components/prism-${component}.js`;
          let file = `${prismModulePath}/${componentPath}`;
          if (fs.existsSync(file)) {
            this.components.push(componentPath);
          }
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
            let pluginPath = `plugins/${plugin}/prism-${plugin}.${fileExtension}`;
            let file = `${prismModulePath}/${pluginPath}`;

            if (fs.existsSync(file)) {
              this.plugins.push(pluginPath);
            }
          });

        });
      }
    }

    target.import(`vendor/prism.js`);
    target.import(`vendor/${this.theme}`);
    this.components.forEach((component) => target.import(`vendor/${component}`));
    this.plugins.forEach((plugin) => target.import(`vendor/${plugin}`));
    this._super.included.apply(this, arguments);
  }
};
