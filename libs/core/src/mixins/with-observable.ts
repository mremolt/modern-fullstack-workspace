import { Subject } from 'rxjs';
import { Constructor } from '../interfaces/constructor.type';

export function withObservables<TBase extends Constructor<HTMLElement>>(baseClass: TBase) {
  return class extends baseClass {
    public readonly onDestroy$ = new Subject();

    public disconnectedCallback(): void {
      this.onDestroy$.next();
    }
  };
}
