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

export const savePerson = createAsyncAction(
  '[People] Save Person',
  '[People] Save Person Success',
  '[People] Save Person Error',
  '[People] Save Person Cancel'
)<Person, Person, AjaxError, void>();

export const deletePerson = createAsyncAction(
  '[People] Delete Person',
  '[People] Delete Person Success',
  '[People] Delete Person Error',
  '[People] Delete Person Cancel'
)<Person, {}, AjaxError, void>();
