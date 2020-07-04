export class MessageLog {
  static log(message: string) {
    if (process.env.NODE_ENV !== 'test') {
      console.log(`Proyecto con TypeORM: ${message}`);
    }
  }
}
