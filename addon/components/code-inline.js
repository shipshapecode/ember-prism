import Ember from 'ember';

export default Ember.Component.extend({
  tagName:'code',
  classNames: ['codeinline'],
  classNameBindings: ['languageClass'],

  inline:true,
  language:'markup',
  languageClass: Ember.computed('language', function(){
    return 'language-' + this.get('language');
  }),

  getElement: function(){
    return this.$()[0];
  },

  didInsertElement: function(){
    Prism.highlightElement(this.getElement());
  }
});
