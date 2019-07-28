import { Reducer } from 'redux';
import { diContainer } from '../di-container';
import { APP_REDUCERS } from '../symbols/app.reducers.symbol';

export function addReducer(key: string, reducer: Reducer): void {
  diContainer.bind(APP_REDUCERS).toConstantValue({ [key]: reducer });
}
