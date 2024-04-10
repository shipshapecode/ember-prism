import '@glint/environment-ember-loose';

import type { ModifierLike } from '@glint/template';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    // @ember/render-modifiers

    'did-insert': ModifierLike<{
      Args: {
        Positional: [(element: HTMLElement) => void];
      };
      Element: HTMLElement;
    }>;

    'did-update': ModifierLike<{
      Args: {
        Positional: [(element: HTMLElement) => void, ...args: unknown[]];
      };
      Element: HTMLElement;
    }>;
  }
}
