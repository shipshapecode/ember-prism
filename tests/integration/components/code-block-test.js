import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | code-block', function (hooks) {
  setupRenderingTest(hooks);

  test('it adds language class', async function (assert) {
    await render(hbs`
      <CodeBlock @language="html" @code="<p>Test</p>"/>
    `);

    assert.dom('pre').hasClass('language-html');
  });

  test('it highlights code', async function (assert) {
    const code = '<p class="foo">Test</p>';
    this.set('code', code);

    await render(hbs`
      <CodeBlock @code={{this.code}}/>
    `);

    assert.dom('code').hasText(code);
    assert.dom('code > .tag').hasText('<p class="foo">');
  });

  test('it accepts code as argument', async function (assert) {
    const code = '<p class="foo">Test</p>';
    this.set('code', code);
    await render(hbs`
      <CodeBlock @code={{this.code}}/>
    `);

    assert.dom('code').hasText(code);
    assert.dom('code > .tag').hasText('<p class="foo">');
  });

  test('it updates code as argument', async function (assert) {
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

  test('takes a @start param to apply on the <pre> element ', async function (assert) {
    /*
      https://stackoverflow.com/questions/532073/how-can-i-read-the-applied-css-counter-value
      the counter is rendered using the css :before selector meaning we cannot assert on the value
      ie. we don't assert on the value 1000, 1001, etc.. in the example below
    */
    const code =
      '<p>line 1</p>\n<p>line 2</p>\n<p>line 3</p>\n<p>line 4</p>\n<p>line 5</p>\n';
    const lineStartNumber = 1000;
    this.set('code', code);
    this.set('start', lineStartNumber);
    await render(hbs`
      <CodeBlock @language="html" @code={{this.code}} @start={{this.start}} class="line-numbers"/>
    `);

    assert.dom('code .line-numbers-rows').exists();
    assert.dom('pre').hasAttribute('data-start', `${lineStartNumber}`);
  });
});
