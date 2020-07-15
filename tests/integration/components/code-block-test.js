import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | code-block', function(hooks) {
  setupRenderingTest(hooks);

  test('it adds language class', async function(assert) {
    await render(hbs`
      <CodeBlock @language="html" @code="<p>Test</p>"/>
    `);

    assert.dom('pre').hasClass('language-html');
  });

  test('it highlights code', async function(assert) {
    const code = '<p class="foo">Test</p>';
    this.set('code', code);

    await render(hbs`
      <CodeBlock @code={{this.code}}/>
    `);

    assert.dom('code').hasText(code);
    assert.dom('code > .tag').hasText('<p class="foo">');
  });

  test('it accepts code as argument', async function(assert) {
    const code = '<p class="foo">Test</p>';
    this.set('code', code);
    await render(hbs`
      <CodeBlock @code={{this.code}}/>
    `);

    assert.dom('code').hasText(code);
    assert.dom('code > .tag').hasText('<p class="foo">');
  });

  test('it updates code as argument', async function(assert) {
    const code = '<p class="foo">Test</p>';
    this.set('code', code);
    await render(hbs`
      <CodeBlock @language="html" @code={{this.code}}/>
    `);

    assert.dom('code').hasText(code);
    assert.dom('code > .tag').hasText('<p class="foo">');

    const code2 = '<p class="bar">Test2</p>';
    this.set('code', code2);
    await settled();

    assert.dom('code').hasText(code2);
    assert.dom('code > .tag').hasText('<p class="bar">');
  });
});
