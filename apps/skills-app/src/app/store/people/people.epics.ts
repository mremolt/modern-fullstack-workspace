import { HttpService } from '@mr/core';
import { Person } from '@mr/models';
import { Epic } from 'redux-observable';
import { of, pipe } from 'rxjs';
import { catchError, delay, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { fetchPeople } from './people.actions';

export const fetchPeople$: Epic = (action$, _store, { http }: { http: HttpService }) =>
  action$.pipe(
    filter(isActionOf(fetchPeople.request)),
    switchMap(() =>
      http.get<Person[]>('people').pipe(
        delay(1000),
        map(fetchPeople.success),
        catchError(
          pipe(
            fetchPeople.failure,
            of
          )
        ),
        takeUntil(action$.pipe(filter(isActionOf(fetchPeople.cancel))))
      )
    )
  );
