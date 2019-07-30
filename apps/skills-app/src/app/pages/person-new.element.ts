import { CustomElement, withValidation } from '@mr/core';
import { Person, personValidator } from '@mr/models';
import { LitElement, property } from 'lit-element';
import { html, TemplateResult } from 'lit-html';

import { PeopleFacade } from '../store/people/people.facade';

@CustomElement({ selector: 'skills-person-new' })
export class PersonNewElement extends withValidation(LitElement) {
  @property() public errors: { [key: string]: string } = {};

  private person: Person = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
  };

  constructor(private facade: PeopleFacade) {
    super();
    this.validator = personValidator;
  }

  public firstUpdated(): void {
    this.form = this.renderRoot.querySelector('form') as HTMLFormElement;
  }

  public save(data: Person) {
    this.facade.save(data);
  }

  public render(): TemplateResult {
    if (!this.person) {
      return html``;
    }

    return html`
      <link rel="stylesheet" href="/styles.css" />
      <div class="content">
        <h2>Add new person</h2>

        <form @submit=${this.submit}>
          <div class="field">
            <label class="label">First name</label>
            <div class="control">
              <input
                class="input ${this.getInvalidClass('firstName')}"
                type="text"
                name="firstName"
                placeholder="First name"
                value=${this.person.firstName}
              />
            </div>
          </div>
          ${this.getErrorMessage('firstName')}

          <div class="field">
            <label class="label">Last name</label>
            <div class="control">
              <input
                class="input ${this.getInvalidClass('lastName')}"
                type="text"
                name="lastName"
                placeholder="Last name"
                value=${this.person.lastName}
              />
            </div>
          </div>
          ${this.getErrorMessage('lastName')}

          <div class="field">
            <label class="label">EMail</label>
            <div class="control">
              <input
                class="input ${this.getInvalidClass('email')}"
                type="text"
                name="email"
                placeholder="EMail"
                value=${this.person.email}
              />
            </div>
          </div>
          ${this.getErrorMessage('email')}

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">Submit</button>
            </div>
            <div class="control">
              <a class="button is-text" href="/people">Cancel</a>
            </div>
          </div>
        </form>
      </div>
    `;
  }
}
