import { Application, Request, Response } from 'express';
import { RouteDefinition } from '../decorators/route-definition';

interface IController {
  class: any;
  dependencies: Array<any>;
}

const attachRoutes = (
  app: Application,
  listControllers: Array<IController>
) => {
  listControllers.forEach((controller) => {
    const listDependenciesInstances: Array<any> = [];
    controller.dependencies.forEach((dependency) => {
      const instance = new dependency();
      listDependenciesInstances.push(instance);
    });

    const instance: any = new controller.class(...listDependenciesInstances);

    const prefix = Reflect.getMetadata('prefix', controller.class);

    const routes: RouteDefinition[] = Reflect.getMetadata(
      'routes',
      controller.class
    );
    // get, path, metodo

    routes.forEach((route: RouteDefinition) => {
      app[route.requestMethod](
        prefix + route.path,
        (req: Request, res: Response) => {
          instance[route.methodName](req, res);
        }
      );
      // app.get("/", (req, res)=> {})
    });
  });
};

export default attachRoutes;
