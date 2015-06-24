/* global Prism */

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'pre',
  classNames: ['code-block'],
  classNameBindings: ['languageClass'],

  inline: false,
  language: 'markup',

  languageClass: Ember.computed('language', function(){
    return 'language-' + this.get('language');
  }),

  getElement: function(){
    return this.$('[class*=language-]')[0];
  },

  didInsertElement: function(){
    Prism.highlightElement(this.getElement());
  }
});
