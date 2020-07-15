import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  canYouDigIt = `
  <div>
    Can you dig it?
  </div>`;

  hbsExample = `
  {{!-- app/components/panel.hbs --}}

  {{#if this.isAdmin}}
    <Panel::Admin />
  {{else}}
    <Panel::NonAdmin />
  {{/if}}`;
}
