'use strict';

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    return installPrismBowerPackage(this);
  },

  installPrismBowerPackage: installPrismBowerPackage
};

/**
 * Installs the Prism Bower package using the given blueprint instance.
 * This function is a public hook to allow other addons that wish to use
 * ember-prism to ensure that they're using the correct version of
 * the package.
 */
function installPrismBowerPackage(blueprint) {
  return blueprint.addBowerPackageToProject('prism');
}
