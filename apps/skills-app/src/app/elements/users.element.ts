import { CustomElement, HttpService, withObservables } from '@mr/core';

import { LitElement } from 'lit-element';

import { html, TemplateResult } from 'lit-html';

@CustomElement({ selector: 'skills-users', useLightDom: true })
export class HomeElement extends withObservables(LitElement) {
  constructor(private http: HttpService) {
    super();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.http.get('people').subscribe(console.warn);
  }

  public render(): TemplateResult {
    return html`
      <h2>Listing Users</h2>

      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>EMail</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
        </tbody>
      </table>
    `;
  }
}
