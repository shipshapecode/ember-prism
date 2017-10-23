import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import {find} from 'ember-native-dom-helpers';
import { test } from 'qunit';

moduleForAcceptance('Acceptance | code block');

test('has `line-numbers` plugin', function(assert) {
  visit('/');

  andThen(function() {
    assert.ok(find('pre.code-block.line-numbers'), '`pre.codeblock.line-numbers` is added to the template');
    assert.ok(find('pre.code-block .line-numbers-rows'), '`line-numbers` plugin generates `.line-numbers-rows`');
  });
});
