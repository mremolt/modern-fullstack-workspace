import { CustomElement, HttpService, withObservables } from '@mr/core';

import { LitElement } from 'lit-element';

import { BestService } from '../services/best.service';

import { html, TemplateResult } from 'lit-html';

@CustomElement({ selector: 'skills-users' })
export class HomeElement extends withObservables(LitElement) {
  constructor(private service: BestService, private http: HttpService) {
    super();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.http.get('people').subscribe(console.warn);
  }

  public render(): TemplateResult {
    return html`
      <p>Hello Users!</p>
      <p>Service: ${this.service.getData()}</p>
    `;
  }
}
