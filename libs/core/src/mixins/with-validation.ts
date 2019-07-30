import { ErrorObject, ValidateFunction } from 'ajv';
import { html, TemplateResult } from 'lit-html';
import { Constructor } from '../interfaces/constructor.type';

export function withValidation<TBase extends Constructor<HTMLElement>>(baseClass: TBase) {
  return class extends baseClass {
    public validator!: ValidateFunction;
    public errors: { [key: string]: string } = {};
    public form!: HTMLFormElement;

    public parseErrors(errors: ErrorObject[]): { [key: string]: string } {
      return errors.reduce((result: { [key: string]: string }, item) => {
        const key = item.dataPath.replace('.', '');
        result[key] = item.message as string;
        return result;
      }, {});
    }

    public isValid(key: string): boolean {
      return !this.errors[key];
    }

    public getInvalidClass(key: string): string {
      return this.isValid(key) ? '' : 'is-danger';
    }

    public getErrorMessage(key: string): TemplateResult {
      const message = this.errors[key];
      if (message) {
        return html`
          <p class="help is-danger">${message}</p>
        `;
      }
      return html``;
    }

    public submit(e: Event): void {
      e.preventDefault();

      const formData = new FormData(this.form);
      const data = Array.from(formData.entries()).reduce((result, item) => {
        if (item[0] === 'id') {
          // workaround for now: cast id to number
          item[1] = Number(item[1]) as any;
        }

        return { ...result, [item[0]]: item[1] };
      }, {}) as any;

      const isValid = this.validator(data);

      if (isValid) {
        this.errors = {};
        this.save(data);
      } else {
        this.errors = this.parseErrors(this.validator.errors || []);
      }
    }

    public save(_data: any) {
      throw new Error('Override in class!');
    }
  };
}
