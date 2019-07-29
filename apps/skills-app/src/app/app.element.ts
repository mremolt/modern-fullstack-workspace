import { CustomElement } from '@mr/core';
import { Router } from '@vaadin/router';
import { html, LitElement, TemplateResult } from 'lit-element';

import { ROUTES } from './app.routes';

@CustomElement({ selector: 'skills-app', useLightDom: true })
export class AppElement extends LitElement {
  public shadowRoot!: ShadowRoot;

  constructor() {
    super();
  }

  public connectedCallback(): void {
    super.connectedCallback();
  }

  public firstUpdated(): void {
    const outlet = this.renderRoot.querySelector('#outlet');
    const router = new Router(outlet);
    router.setRoutes(ROUTES);
  }

  public render(): TemplateResult {
    return html`
      <style>
        .content {
          flex: 1;
        }
      </style>

      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <strong>Skills App</strong>
          </a>

          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href="/">
              Home
            </a>

            <a class="navbar-item"  href="/users">
              Users
            </a>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                More
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item">
                  About
                </a>
                <a class="navbar-item">
                  Jobs
                </a>
                <a class="navbar-item">
                  Contact
                </a>
                <hr class="navbar-divider" />
                <a class="navbar-item">
                  Report an issue
                </a>
              </div>
            </div>
          </div>
      </nav>

      <section class="section content">
        <div class="container">
          
          <div id="outlet"></div>
        </div>
      </section>

      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            The best footer ever!
          </p>
        </div>
      </footer>
    `;
  }
}
