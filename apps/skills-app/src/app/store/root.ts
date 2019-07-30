import { addReducer, APP_EPICS, diContainer } from '@mr/core';
import { combineReducers } from 'redux';

import { counter2 } from './counter2/counter2.reducer';
import { people } from './people/people.reducer';

import { PEOPLE_FEATURE_NAME } from './people/feature-name.constant';
import { deletePerson$, fetchPeople$, redirectAfterSave$, savePerson$ } from './people/people.epics';

const reducerMap = combineReducers({ people, counter: counter2 });

export type State = ReturnType<typeof reducerMap>;

addReducer('counter', counter2);
addReducer(PEOPLE_FEATURE_NAME, people);

diContainer.bind(APP_EPICS).toConstantValue(fetchPeople$);
diContainer.bind(APP_EPICS).toConstantValue(savePerson$);
diContainer.bind(APP_EPICS).toConstantValue(deletePerson$);
diContainer.bind(APP_EPICS).toConstantValue(redirectAfterSave$);
