import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
var App;

module('Acceptance | CodeBlock', {
  beforeEach: function() {
    App = startApp();
  },
  afterEach: function() {
    Ember.run(App, App.destroy);
  }
});

test('has `line-numbers` plugin', function(assert) {
  visit('/').then(function() {
    assert.equal(find('pre.codeblock.line-numbers').length, 1, 'One `pre.codeblock.line-numbers` is added to the template');
    assert.equal(find('pre.codeblock .line-numbers-rows').length, 1, '`line-numbers` plugin generates one `.line-numbers-rows`');
  });
});
