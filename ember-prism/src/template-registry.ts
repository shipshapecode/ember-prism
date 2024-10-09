import type CodeBlock from './components/code-block';
import type CodeInline from './components/code-inline';

export default interface Registry {
  CodeBlock: typeof CodeBlock;
  CodeInline: typeof CodeInline;
}
