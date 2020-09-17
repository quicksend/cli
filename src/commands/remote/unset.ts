import { Command } from "../../command";

export default class UnsetRemote extends Command {
  static description = "unset the current remote";

  async run(): Promise<void> {
    this.settings.delete("remote");
    this.log("The remote has been successfully unset!");
  }
}
