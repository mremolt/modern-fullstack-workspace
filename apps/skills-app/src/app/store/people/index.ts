import { APP_EPICS, diContainer } from '@mr/core';
import { fetchPeople$ } from './people.epics';

diContainer.bind(APP_EPICS).toConstantValue(fetchPeople$);

export * from './people.reducer';
