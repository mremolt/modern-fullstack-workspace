import { AjaxError } from 'rxjs/ajax';
import { DeepReadonly } from 'utility-types';

export type NormalizedState<T> = Readonly<{
  entities: DeepReadonly<{ root: { [key: string]: T }; [key: string]: { [key: string]: any } }>;
  result: number[];
  loading: boolean;
  loaded: boolean;
  dirty: boolean;
  error: AjaxError | null;
  active: number | null;
}>;
