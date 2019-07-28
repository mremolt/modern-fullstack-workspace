import { CustomElement, Store, withObservables } from '@mr/core';
import { Router } from '@vaadin/router';
import { html, LitElement, property, TemplateResult } from 'lit-element';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ROUTES } from './app.routes';
import './elements/home.element';
import './elements/users.element';
import { BestService } from './services/best.service';
import { State } from './store/root';

const counterSelector = (state: State) => state.counter;

@CustomElement({ selector: 'skills-app', useLightDom: true })
export class AppElement extends withObservables(LitElement) {
  public shadowRoot!: ShadowRoot;

  @property() private counter: number = 0;

  private counter$: Observable<number>;

  constructor(private service: BestService, private store: Store<State>) {
    super();

    this.counter$ = this.store.select(counterSelector);
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.counter$.pipe(takeUntil(this.onDestroy$)).subscribe(num => {
      this.counter = num;
    });

    setInterval(() => {
      this.store.dispatch({ type: 'INCREMENT' });
    }, 160);
  }

  public firstUpdated(): void {
    const outlet = this.renderRoot.querySelector('#outlet');
    const router = new Router(outlet);
    router.setRoutes(ROUTES);
  }

  public render(): TemplateResult {
    return html`
      <p>Hello World!</p>
      <p>Data: ${this.service.getData()}</p>
      <p>Number: ${this.counter}!</p>

      <a href="/">Home</a>
      <a href="/users">Users</a>

      <div id="outlet"></div>
    `;
  }
}
