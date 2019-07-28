import { injectable, multiInject } from 'inversify';
import { AnyAction, applyMiddleware, combineReducers, createStore, Store as ReduxStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createEpicMiddleware } from 'redux-observable-es6-compat';

import { Observable } from 'rxjs';

import { distinctUntilChanged, map, share } from 'rxjs/operators';

import { Selector } from 'reselect';
import { APP_REDUCERS } from '../symbols/app.reducers.symbol';

@injectable()
export class Store<T = any> extends Observable<T> {
  private store: ReduxStore<T>;

  constructor(@multiInject(APP_REDUCERS) private reducers: any[]) {
    super();

    const reducerMap = this.reducers.reduce((result, reducerConfig) => {
      return { ...result, ...reducerConfig };
    }, {});

    const epicMiddleware = createEpicMiddleware();

    const composeEnhancers = composeWithDevTools({
      name: 'Web Components demo app',
      trace: true,
    });

    this.store = createStore<T, AnyAction, any, any>(
      combineReducers(reducerMap),
      composeEnhancers(applyMiddleware(epicMiddleware))
    );
    this.source = this.connect().pipe(distinctUntilChanged());
  }

  public dispatch<A extends AnyAction>(action: A): A {
    return this.store.dispatch(action);
  }

  public select<R>(selector: Selector<T, R>): Observable<R> {
    return this.source.pipe(
      map(state => selector(state)),
      distinctUntilChanged(),
      share()
    );
  }

  private connect(): Observable<T> {
    return new Observable(observer => {
      observer.next(this.store.getState());

      this.store.subscribe(() => {
        observer.next(this.store.getState());
      });
    });
  }
}
