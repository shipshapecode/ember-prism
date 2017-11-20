import CodeBase from './code-base';

export default CodeBase.extend({
  tagName: 'pre',
  classNames: ['code-block'],

  getElement() {
    return this.element.querySelector('[class*=language-]');
  },

  didRender() {
    this.element.innerHTML = this.element.innerHTML.trim();
  }
});
