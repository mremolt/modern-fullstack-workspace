import { NormalizedState } from '@mr/core';
import { PersonDto, SkillDto } from '@mr/models';
import { normalize, schema } from 'normalizr';
import { ActionType, createReducer } from 'typesafe-actions';
import { deletePerson, fetchPeople, reset, savePerson, setActive } from './people.actions';

import dotPropImmutable from 'dot-prop-immutable';

export type PeopleAction = ActionType<
  typeof fetchPeople | typeof savePerson | typeof deletePerson | typeof reset | typeof setActive
>;
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
  updating: false,
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
  .handleAction(setActive, (state, action) => ({ ...state, active: action.payload }))
  .handleAction(savePerson.request, (state, action) => {
    const person = action.payload;
    // tslint:disable-next-line: no-parameter-reassignment
    state = {
      ...state,
      updating: true,
      result: [...new Set([...state.result, Number(person.id)])].filter(n => !isNaN(n)),
    };
    return dotPropImmutable.set(state, `entities.root.${person.id}`, person);
  })
  .handleAction(savePerson.success, (state, action) => {
    const person = action.payload;
    // tslint:disable-next-line: no-parameter-reassignment
    state = {
      ...state,
      updating: false,
      result: [...new Set([...state.result, Number(person.id)])].filter(n => !isNaN(n)),
    };
    return dotPropImmutable.set(state, `entities.root.${person.id}`, person);
  })
  .handleAction(savePerson.failure, (state, action) => {
    return { ...state, error: action.payload };
  })
  .handleAction(deletePerson.request, (state, action) => {
    return { ...state, updating: true, result: state.result.filter(n => n !== action.payload.id) };
  })
  .handleAction(deletePerson.success, (state, _action) => {
    return { ...state, updating: false };
  })
  .handleAction(deletePerson.failure, (state, action) => {
    return { ...state, error: action.payload };
  });
