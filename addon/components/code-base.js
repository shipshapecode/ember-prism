/* global Prism */
import Component from '@ember/component';
import { computed } from '@ember/object';
import { empty } from '@ember/object/computed';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  classNameBindings: ['languageClass'],
  inline: false,
  language: 'markup',
  code: null,

  hasBlock: empty('code'),

  languageClass: computed('language', function() {
    return `language-${this.language}`;
  }),

  getBlockContent() {
    return this.blockElement && this.blockElement.textContent;
  },

  prismCode: computed('code', 'hasBlock', 'language', function() {
    let code = this.hasBlock ? this.getBlockContent() : this.code;
    const language = this.language;
    if (!code) return '';

    if (Prism && Prism.plugins && Prism.plugins.NormalizeWhitespace) {
      code = Prism.plugins.NormalizeWhitespace.normalize(code);
    }

    const grammar = Prism.languages[language];
    if (!grammar) return '';

    const prismCode = Prism.highlight(code, grammar, language);
    return htmlSafe(prismCode);
  }),

  getElement() {
    return this.element;
  },

  init() {
    this._super(...arguments);
    if (typeof document !== 'undefined') {
      this.blockElement = document.createElement('div');
    }
  },

  didRender() {
    this._super(...arguments);
    let code = this.code;
    if (this.hasBlock) {
      code = this.getBlockContent();

      // if block content has changed, force reevaluation of `prismCode`
      if (code !== this._lastBlockContent) {
        this._lastBlockContent = code;
        this.notifyPropertyChange('prismCode');
      }
    }

    // force plugin initialization, required for Prism.highlight usage, see https://github.com/PrismJS/prism/issues/1234
    Prism.hooks.run('complete', {
      code,
      element: this.getElement()
    });
  }
});
