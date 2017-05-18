import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | code block');

test('has `line-numbers` plugin', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('pre.code-block.line-numbers').length, 1, 'One `pre.codeblock.line-numbers` is added to the template');
    assert.equal(find('pre.code-block .line-numbers-rows').length, 1, '`line-numbers` plugin generates one `.line-numbers-rows`');
  });
});
