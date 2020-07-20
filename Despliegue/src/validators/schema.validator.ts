import { NextFunction, Request, Response } from 'express';
import Responses from '../utils/responses.util';

export class SchemaValidator {
  static canValidate(schemas: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const listContainersParameters = ['body', 'params', 'query', 'headers'];

      const listValidations: Array<Promise<any>> = [];

      listContainersParameters.forEach((it: any) => {
        if (schemas[it]) {
          switch (it) {
            case 'body':
              listValidations.push(schemas[it].validate(req.body));
              break;
            case 'params':
              listValidations.push(schemas[it].validate(req.params));
              break;
            case 'query':
              listValidations.push(schemas[it].validate(req.query));
              break;
            case 'headers':
              listValidations.push(schemas[it].validate(req.headers));
              break;
          }
        }
      });

      Promise.all(listValidations)
        .then((results) => {
          let hasError = false;
          results.forEach((result) => {
            if (result.error && !hasError) {
              hasError = true;
              Responses.send(res, 411, result.error);
            }
          });
          if (!hasError) {
            next();
          }
        })
        .catch((err) => {
          Responses.send(res, 411, err.error);
        });
    };
  }
}
