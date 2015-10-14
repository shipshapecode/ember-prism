/* global Prism */
import Ember from 'ember';
const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName:           'code',
  classNames:        ['code-inline'],
  classNameBindings: ['languageClass'],

  inline:   true,
  language: 'markup',

  languageClass: computed('language', function(){
    return 'language-' + this.get('language');
  }),

  getElement(){
    return this.$()[0];
  },

  didInsertElement(){
    Prism.highlightElement(this.getElement());
  }
});
