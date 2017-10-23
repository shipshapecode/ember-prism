import CodeBase from './code-base';

export default CodeBase.extend({
  tagName: 'pre',
  classNames: ['code-block'],
  inline: false,

  getElement() {
    return this.element.querySelector('[class*=language-]');
  }
});
