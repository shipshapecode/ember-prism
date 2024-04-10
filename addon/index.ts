import { setup as glimmer } from 'prismjs-glimmer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Prism: any;

export function setup() {
  glimmer(Prism);

  Prism.languages.handlebars = Prism.languages.glimmer;
}
