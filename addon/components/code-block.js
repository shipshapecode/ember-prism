import Ember from 'ember';
import CodeInline from './code-inline';

export default CodeInline.extend({
  tagName:'pre',
  classNames: ['codeblock'],
  classNameBindings: ['languageClass'],

  inline:false,

  getElement: function(){
    return this.$('[class*=language-]')[0];
  }
});
