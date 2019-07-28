import { diContainer } from '../di-container';

// tslint:disable-next-line: function-name
export function CustomElement({ selector, useLightDom }: { selector: string; useLightDom?: boolean }) {
  return (target: any) => {
    const paramTypes = Reflect.getMetadata('design:paramtypes', target);
    const constructorArgs = paramTypes.map((t: any) => diContainer.get(t));

    const elementProxy = new Proxy<any>(target, {
      construct(targetClass: any, _args: any[], extended: any) {
        if (useLightDom) {
          targetClass.prototype.createRenderRoot = function() {
            return this;
          };
        }

        return Reflect.construct(targetClass, constructorArgs, extended);
      },
    });

    window.customElements.define(selector, elementProxy);

    return elementProxy;
  };
}
