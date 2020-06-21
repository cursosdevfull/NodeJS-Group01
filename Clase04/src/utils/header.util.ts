export class HeaderUtil {
  static getHeader(headers: any, nameHeader: string): string {
    return headers[nameHeader];
  }
}
