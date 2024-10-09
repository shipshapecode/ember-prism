import Controller from '@ember/controller';
import { setup } from 'ember-prism';

setup();

export default class ApplicationController extends Controller {
  canYouDigIt = `
  <div>
    Can you dig it?
  </div>`;

  hbsExample = `
  {{!-- app/components/panel.hbs --}}

  <Panel @user={{@name}} {{modifier 1 true}}>
    <:admin>
      {{#if this.isSuperUser}}
        <Controls::Extra />
      {{/if}}
    </:admin>
    <:nonAdmin>
      No Controls
    </:nonAdmin>
  </Panel>`;
}
