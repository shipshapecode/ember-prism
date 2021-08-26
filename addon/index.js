/* globals Prism */
import { setup as glimmer } from 'prismjs-glimmer';

export function setup() {
  glimmer(Prism);

  Prism.languages.handlebars = Prism.languages.glimmer;
}
