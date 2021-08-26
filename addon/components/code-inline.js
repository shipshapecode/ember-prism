/* global Prism */
import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { assert } from '@ember/debug';
import { trackedRef } from 'ember-ref-bucket';

export default class CodeInlineComponent extends Component {
  @trackedRef('codeElement') codeElement;

  get code() {
    const code = this.args.code;
    assert(
      "ember-prism's <CodeBlock/> and <CodeInline/> components require a `code` parameter to be passed in.",
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

  get prismCode() {
    let prismCode = '';

    if (this.codeElement) {
      const code = this.code;
      const language = this.language;
      const grammar = Prism.languages[language];

      if (code && language && grammar) {
        prismCode = htmlSafe(Prism.highlight(code, grammar, language));
      }

      // Force plugin initialization, required for Prism.highlight usage.
      // See https://github.com/PrismJS/prism/issues/1234
      Prism.hooks.run('complete', {
        code,
        element: this.codeElement,
      });
    }

    return prismCode;
  }
}
