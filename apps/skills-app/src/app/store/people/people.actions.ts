import { Person } from '@mr/models';

import { AjaxError } from 'rxjs/ajax';
import { createAction, createAsyncAction } from 'typesafe-actions';

export const fetchPeople = createAsyncAction(
  '[People] Fetch',
  '[People] Fetch Success',
  '[People] Fetch Error',
  '[People] Fetch Cancel'
)<void, Person[], AjaxError, void>();

export const reset = createAction('[People] Reset State');
export const setActive = createAction('[People] Set active Person', action => (id: number) => action(id));
