import { CustomElement, withObservables } from '@mr/core';

import { LitElement } from 'lit-element';

import { BestService } from '../services/best.service';

import { html, TemplateResult } from 'lit-html';

@CustomElement({ selector: 'skills-home', useLightDom: true })
export class HomeElement extends withObservables(LitElement) {
  public shadowRoot!: ShadowRoot;

  constructor(private service: BestService) {
    super();
  }

  public render(): TemplateResult {
    return html`
      <p>Hello Home!</p>
      <p>Service: ${this.service.getData()}</p>
    `;
  }
}
