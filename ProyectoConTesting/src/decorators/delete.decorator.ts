import { RouteDefinition } from './route-definition';

export const Delete = (path: string): MethodDecorator => {
  return (target, propertyKey: string) => {
    const value = Reflect.hasMetadata('routes', target.constructor);
    if (!value) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<
      RouteDefinition
    >;

    routes.push({
      requestMethod: 'delete',
      path,
      methodName: propertyKey,
    });

    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};
