/* global Prism */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';

export default class CodeBaseComponent extends Component {
  @tracked prismCode = '';

  get code() {
    const code = this.args.code;

    assert(
      'ember-prism\'s <CodeBlock/> and <CodeInline/> components require a `code` parameter to be passed in.',
      code !== undefined
    );
    if (Prism?.plugins?.NormalizeWhitespace) {
      return Prism.plugins.NormalizeWhitespace.normalize(code);
    }

    return code;
  }

  get language() {
    return this.args.language ?? 'markup';
  }

  get languageClass() {
    return `language-${this.language}`;
  }

  @action
  setPrismCode(element) {
    const code = this.code;
    const language = this.language;
    const grammar = Prism.languages[language];

    if (code && language && grammar) {
      this.prismCode = htmlSafe(Prism.highlight(code, grammar, language));
    } else {
      this.prismCode = '';
    }

    // Force plugin initialization, required for Prism.highlight usage.
    // See https://github.com/PrismJS/prism/issues/1234
    Prism.hooks.run('complete', {
      code,
      element
    });
  }
}
