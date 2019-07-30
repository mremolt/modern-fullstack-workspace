import { NormalizedState } from '@mr/core';
import { PersonDto, SkillDto } from '@mr/models';
import { normalize, schema } from 'normalizr';
import { ActionType, createReducer } from 'typesafe-actions';
import { fetchPeople, reset, setActive } from './people.actions';

export type PeopleAction = ActionType<typeof fetchPeople | typeof reset | typeof setActive>;
export const skillSchema = new schema.Entity('skills');
export const skillsSchema = [skillSchema];

export const personSchema = new schema.Entity('root', { skills: skillsSchema });
export const peopleSchema = [personSchema];

export interface State extends NormalizedState<PersonDto> {
  entities: {
    root: { [key: string]: PersonDto };
    skills: { [key: string]: SkillDto };
  };
}

export const initialState: State = {
  entities: { root: {}, skills: {} },
  result: [],
  loading: false,
  loaded: false,
  dirty: false,
  error: null,
  active: null,
};

export const people = createReducer<State, PeopleAction>(initialState)
  .handleAction(fetchPeople.request, (state, _action) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  }))
  .handleAction(fetchPeople.success, (state, action) => ({
    ...state,
    loading: false,
    loaded: true,
    dirty: false,
    ...normalize(action.payload, peopleSchema),
  }))
  .handleAction(fetchPeople.failure, (_state, action) => ({
    ...initialState,
    error: action.payload,
  }))
  .handleAction(reset, () => initialState)
  .handleAction(setActive, (state, action) => ({ ...state, active: action.payload }));
