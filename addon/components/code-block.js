import CodeBase from './code-base';
import layout from '../templates/components/code-block';

export default CodeBase.extend({
  layout,
  tagName: 'pre',
  classNames: ['code-block'],

  getElement() {
    return this.element.querySelector('[class*=language-]');
  }
});
