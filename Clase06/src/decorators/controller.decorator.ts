export const Controller = (prefix = ''): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('prefix', prefix, target);

    const value = Reflect.hasMetadata('routes', target);
    if (!value) {
      Reflect.defineMetadata('routes', [], target);
    }
  };
};
