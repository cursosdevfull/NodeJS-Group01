import application from '../../package.json';

export default class Message {
  static log(message: string) {
    console.log(`${application.name}: ${message}`);
  }
}
