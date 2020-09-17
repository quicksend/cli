import { Command } from "../command";

export default class Logout extends Command {
  static description = "delete the current application key";

  async run(): Promise<void> {
    this.settings.delete("key");
    this.log("The current application key has successfully been deleted!");
  }
}
