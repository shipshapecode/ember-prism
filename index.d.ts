declare module 'ember-prism/components/code-block' {
  import Component from '@glimmer/component';

  export default class CodeBlock extends Component<{
    Args: {
      code: string;
      language: string;
    };
  }> {}
}
