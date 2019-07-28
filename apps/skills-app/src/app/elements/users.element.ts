import { CustomElement, withObservables } from '@mr/core';

import { LitElement } from 'lit-element';

import { BestService } from '../services/best.service';

import { html, TemplateResult } from 'lit-html';

@CustomElement({ selector: 'skills-users' })
export class HomeElement extends withObservables(LitElement) {
  public shadowRoot!: ShadowRoot;

  constructor(private service: BestService) {
    super();
  }

  public render(): TemplateResult {
    return html`
      <p>Hello Users!</p>
      <p>Service: ${this.service.getData()}</p>
    `;
  }
}
