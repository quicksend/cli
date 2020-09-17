import { Command } from "../command";

export default class WhoAmI extends Command {
  static description = "display the user associated with the application key";

  async run(): Promise<void> {
    const user = await this.bytebin.identify();

    this.log(user.displayName);
    this.log(user.username);
    this.log(user.id);
  }
}
