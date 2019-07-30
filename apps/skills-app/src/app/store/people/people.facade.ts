import { Store } from '@mr/core';
import { injectable } from 'inversify';

import { PersonDto } from '@mr/models';
import { Observable } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import { fetchPeople, setActive } from './people.actions';
import {
  FeatureState,
  getActiveEntity,
  getCollection,
  getDirty,
  getError,
  getLoaded,
  getLoading,
} from './people.selectors';

@injectable()
export class PeopleFacade {
  public readonly collection$: Observable<ReadonlyArray<PersonDto>>;
  public readonly loading$: Observable<boolean>;
  public readonly loaded$: Observable<boolean>;
  public readonly dirty$: Observable<boolean>;
  public readonly error$: Observable<AjaxError | null>;
  public readonly activeEntity$: Observable<PersonDto | undefined>;

  constructor(private store: Store<FeatureState>) {
    this.collection$ = this.store.select(getCollection);
    this.loading$ = this.store.select(getLoading);
    this.loaded$ = this.store.select(getLoaded);
    this.dirty$ = this.store.select(getDirty);
    this.error$ = this.store.select(getError);
    this.activeEntity$ = this.store.select(getActiveEntity);
  }

  public fetch(): void {
    this.store.dispatch(fetchPeople.request());
  }

  public setActive(id: number): void {
    this.store.dispatch(setActive(id));
  }
}
