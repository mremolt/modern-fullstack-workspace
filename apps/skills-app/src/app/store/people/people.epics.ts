import { HttpService } from '@mr/core';
import { Person } from '@mr/models';
import { Epic } from 'redux-observable';
import { of, pipe } from 'rxjs';
import { catchError, filter, ignoreElements, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { Router } from '@vaadin/router';

import { deletePerson, fetchPeople, savePerson } from './people.actions';

export const fetchPeople$: Epic = (action$, _store, { http }: { http: HttpService }) =>
  action$.pipe(
    filter(isActionOf(fetchPeople.request)),
    switchMap(() =>
      http.get<Person[]>('people').pipe(
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

export const savePerson$: Epic = (action$, _store, { http }: { http: HttpService }) =>
  action$.pipe(
    filter(isActionOf(savePerson.request)),
    switchMap(action => {
      const person = action.payload;

      if (person.id) {
        return http.put<Person>(`people/${person.id}`, person).pipe(
          map(savePerson.success),
          catchError(
            pipe(
              savePerson.failure,
              of
            )
          ),
          takeUntil(action$.pipe(filter(isActionOf(fetchPeople.cancel))))
        );
      }

      return http.post<Person>('people', person).pipe(
        map(savePerson.success),
        catchError(
          pipe(
            savePerson.failure,
            of
          )
        ),
        takeUntil(action$.pipe(filter(isActionOf(fetchPeople.cancel))))
      );
    })
  );

export const deletePerson$: Epic = (action$, _store, { http }: { http: HttpService }) =>
  action$.pipe(
    filter(isActionOf(deletePerson.request)),
    switchMap(action => {
      const person = action.payload;

      return http.delete(`people/${person.id}`).pipe(
        map(deletePerson.success),
        catchError(
          pipe(
            savePerson.failure,
            of
          )
        ),
        takeUntil(action$.pipe(filter(isActionOf(fetchPeople.cancel))))
      );
    })
  );

export const redirectAfterSave$: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(savePerson.success)),
    tap(() => {
      Router.go('/people');
    }),
    ignoreElements()
  );
