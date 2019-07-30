import { injectable, multiInject } from 'inversify';
import { AnyAction, applyMiddleware, combineReducers, createStore, Store as ReduxStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { combineEpics } from 'redux-observable';
import { createEpicMiddleware } from 'redux-observable-es6-compat';
import { Selector } from 'reselect';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

import { HttpService } from '../http/http.service';
import { APP_EPICS } from '../symbols/app.epics.symbol';
import { APP_REDUCERS } from '../symbols/app.reducers.symbol';

@injectable()
export class Store<T = any> extends Observable<T> {
  private store: ReduxStore<T>;

  constructor(@multiInject(APP_REDUCERS) reducers: any[], @multiInject(APP_EPICS) epics: any[], http: HttpService) {
    super();

    const reducerMap = reducers.reduce((result, reducerConfig) => {
      return { ...result, ...reducerConfig };
    }, {});

    const composeEnhancers = composeWithDevTools({
      name: 'Web Components demo app',
      trace: true,
    });

    const rootEpic = combineEpics(...epics);
    const epicMiddleware = createEpicMiddleware({ dependencies: { http } });

    this.store = createStore<T, AnyAction, any, any>(
      combineReducers(reducerMap),
      composeEnhancers(applyMiddleware(epicMiddleware))
    );

    epicMiddleware.run(rootEpic);
    this.source = this.connect().pipe(distinctUntilChanged());
  }

  public dispatch<A extends AnyAction>(action: A): A {
    return this.store.dispatch(action);
  }

  public select<R>(selector: Selector<T, R>): Observable<R> {
    return this.source.pipe(
      map(state => selector(state)),
      distinctUntilChanged(),
      shareReplay(1)
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
