import cli from "cli-ux";

import { Command } from "../command";

export default class Login extends Command {
  static description = "set an application key";

  static args = [
    {
      name: "key",
      description: "the application key to set",
      required: true
    }
  ];

  static requireRemote = true;

  async run(): Promise<void> {
    const { args } = this.parse(Login);

    cli.action.start("Authenticating", "initializing", { stdout: true });

    const user = await this.bytebin.identify(args.key);

    cli.action.stop("success!");

    this.settings.update({ key: args.key });

    this.log(`Successfully authenticated as ${user.displayName}!`);
  }
}
