import { CustomElement, withObservables } from '@mr/core';

import { LitElement } from 'lit-element';

import { BestService } from '../services/best.service';

import { html, TemplateResult } from 'lit-html';

@CustomElement({ selector: 'skills-home', useLightDom: false })
export class HomeElement extends withObservables(LitElement) {
  constructor(private service: BestService) {
    super();
  }

  public render(): TemplateResult {
    return html`
      <link rel="stylesheet" href="/styles.css" />
      <div class="content">
        <h2>Homepage</h2>
        <p>Service: ${this.service.getData()}</p>
      </div>
    `;
  }
}
