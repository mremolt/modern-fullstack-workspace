import { addReducer } from '@mr/core';
import { combineReducers } from 'redux';

import { counter2 } from './counter2/counter2.reducer';

const reducerMap = combineReducers({ counter: counter2 });

export type State = ReturnType<typeof reducerMap>;

addReducer('counter', counter2);
