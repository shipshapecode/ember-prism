/* global Prism */
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNameBindings: ['languageClass'],
  language: 'markup',

  languageClass: computed('language', function() {
    return 'language-' + this.get('language');
  }),

  getElement() {
    return this.element;
  },

  didInsertElement() {
    Prism.highlightElement(this.getElement());
  }
});
