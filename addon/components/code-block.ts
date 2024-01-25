import Component from '@glimmer/component';

interface CodeBlockSignature {
  Args: {
    code: string;
    language: string;
  };
}

export default class CodeBlockComponent extends Component<CodeBlockSignature> {
  get language() {
    return this.args.language ?? 'markup';
  }

  get languageClass() {
    return `language-${this.language}`;
  }
}
