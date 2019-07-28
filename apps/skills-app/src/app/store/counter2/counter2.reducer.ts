import { AnyAction } from 'redux';

export function counter2(state = 0, action: AnyAction) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
