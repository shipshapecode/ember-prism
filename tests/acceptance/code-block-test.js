import { find, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';


module('Acceptance | code block', function(hooks) {
  setupApplicationTest(hooks);

  test('has `line-numbers` plugin', async function(assert) {
    await visit('/');

    assert.dom('pre.code-block.line-numbers').exists('`pre.codeblock.line-numbers` is added to the template');
    assert.dom('pre.code-block .line-numbers-rows').exists('`line-numbers` plugin generates `.line-numbers-rows`');
  });

  test('the pre innerHTML is trimmed when rendered', async function(assert) {
    await visit('/');

    assert.equal(find('pre.can-you-dig-it').innerHTML.split('\n').length, 3);
  });
});
