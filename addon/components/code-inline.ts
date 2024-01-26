import Component from '@glimmer/component';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Prism: any;

interface CodeInlineSignature {
  Args: {
    code: string;
    language?: string;
  };
  Element: HTMLElement;
}

export default class CodeInlineComponent extends Component<CodeInlineSignature> {
  @tracked prismCode = '';

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

  @action
  setPrismCode(element: Element) {
    const code = this.code;
    const language = this.language;
    const grammar = Prism.languages[language];

    if (code && language && grammar) {
      this.prismCode = htmlSafe(
        Prism.highlight(code, grammar, language)
      ) as unknown as string;
    } else {
      this.prismCode = '';
    }

    // Force plugin initialization, required for Prism.highlight usage.
    // See https://github.com/PrismJS/prism/issues/1234
    Prism.hooks.run('complete', {
      code,
      element,
    });
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    CodeInline: typeof CodeInlineComponent;
  }
}
