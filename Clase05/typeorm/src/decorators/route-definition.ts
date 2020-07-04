export interface RouteDefinition {
  requestMethod: 'get' | 'post' | 'put' | 'delete' | 'options';
  path: string;
  methodName: string;
}
