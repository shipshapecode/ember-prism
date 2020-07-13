import Component from '@glimmer/component';

export default class CodeBlockComponent extends Component {
  get language() {
    return this.args.language ?? 'markup';
  }

  get languageClass() {
    return `language-${this.language}`;
  }
}
