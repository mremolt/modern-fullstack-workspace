import { PersonDto } from '@mr/models';
import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { PEOPLE_FEATURE_NAME } from './feature-name.constant';
import { peopleSchema, State } from './people.reducer';

export interface FeatureState {
  [PEOPLE_FEATURE_NAME]: State;
}

export const getFeatureState = (state: FeatureState) => state.people;

export const getEntities = createSelector(
  [getFeatureState],
  state => state.entities
);

export const getResult = createSelector(
  [getFeatureState],
  state => state.result
);

export const getLoading = createSelector(
  [getFeatureState],
  state => state.loading
);

export const getLoaded = createSelector(
  [getFeatureState],
  state => state.loaded
);

export const getDirty = createSelector(
  [getFeatureState],
  state => state.dirty
);

export const getError = createSelector(
  [getFeatureState],
  state => state.error
);

export const getActive = createSelector(
  [getFeatureState],
  state => state.active
);

export const getCollection = createSelector(
  [getEntities, getResult],
  (entities, result) => denormalize(result, peopleSchema, entities) as ReadonlyArray<PersonDto>
);

export const getActiveEntity = createSelector(
  [getCollection, getActive],
  (collection, active) => collection.find(e => e.id === active)
);

export const getSkillsMap = createSelector(
  [getEntities],
  entities => entities.skills
);
