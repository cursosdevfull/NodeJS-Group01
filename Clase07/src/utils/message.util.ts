export default class Message {
  static log(message: string) {
    if (process.env.NODE_ENV !== 'test') {
      console.log(`APP SEQUELIZE | ${message}`);
    }
  }
}
