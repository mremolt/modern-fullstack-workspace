import { CustomElement, withObservables } from '@mr/core';

import { LitElement } from 'lit-element';

import { BestService } from '../services/best.service';

import { html, TemplateResult } from 'lit-html';

@CustomElement({ selector: 'skills-home', useLightDom: true })
export class HomeElement extends withObservables(LitElement) {
  constructor(private service: BestService) {
    super();
  }

  public render(): TemplateResult {
    return html`
      <h2>Homepage</h2>
      <p>Service: ${this.service.getData()}</p>
    `;
  }
}
