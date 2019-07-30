import { CustomElement } from '@mr/core';

import { LitElement } from 'lit-element';

import { html, TemplateResult } from 'lit-html';
import { PeopleFacade } from '../store/people/people.facade';

@CustomElement({ selector: 'skills-person-edit', useLightDom: true })
export class PersonEditElement extends LitElement {
  private location!: {
    params: { id: string };
  };

  constructor(private facade: PeopleFacade) {
    super();
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.facade.activeEntity$.subscribe(console.warn);

    this.facade.fetch();
    this.facade.setActive(Number(this.location.params.id));
  }

  public render(): TemplateResult {
    return html`
      <link rel="stylesheet" href="/styles.css" />
      <h2>Edit person ${this.location.params.id}</h2>
    `;
  }
}
