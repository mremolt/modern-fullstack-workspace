import { asyncObservableTemplate, CustomElement } from '@mr/core';

import { LitElement } from 'lit-element';

import { PersonDto } from '@mr/models';
import { html, TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import { PeopleFacade } from '../store/people/people.facade';

@CustomElement({ selector: 'skills-people-list', useLightDom: false })
export class PeopleListElement extends LitElement {
  constructor(private facade: PeopleFacade) {
    super();
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.facade.fetch();
  }

  public render(): TemplateResult {
    const loadingTemplate = (loading: boolean) => {
      if (loading) {
        return html`
          <progress class="progress is-primary" max="100"></progress>
        `;
      }

      return html``;
    };

    const personTableTemplate = (person: PersonDto) => html`
      <tr>
        <td>${person.id}</td>
        <td>${person.firstName}</td>
        <td>${person.lastName}</td>
        <td>${person.email}</td>
        <td>
          <a class="button is-primary" href="/people/${person.id}/edit">edit</a>
          <button type="button" class="button is-danger">delete</button>
        </td>
      </tr>
    `;

    const peopleTableTemplate = (people: PersonDto[]) =>
      html`
        ${repeat(people, person => person.id, personTableTemplate)}
      `;

    return html`
      <link rel="stylesheet" href="/styles.css" />
      <div class="content">
        <h2>Listing People</h2>

        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First name</th>
              <th>Last name</th>
              <th>EMail</th>
              <th>&nbsp;</th>
            </tr>
          </thead>

          <tbody>
            ${asyncObservableTemplate(this.facade.collection$, peopleTableTemplate)}
          </tbody>
        </table>

        ${asyncObservableTemplate(this.facade.loading$, loadingTemplate)}
      </div>
    `;
  }
}
