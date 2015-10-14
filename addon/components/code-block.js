/* global Prism */
import Ember from 'ember';
const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName:           'pre',
  classNames:        ['code-block'],
  classNameBindings: ['languageClass'],

  inline:   false,
  language: 'markup',

  languageClass: computed('language', function(){
    return 'language-' + this.get('language');
  }),

  getElement(){
    return this.$('[class*=language-]')[0];
  },

  didInsertElement(){
    Prism.highlightElement(this.getElement());
  }
});
