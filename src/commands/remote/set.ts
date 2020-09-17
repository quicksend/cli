import { URL } from "url";

import { Command } from "../../command";

import { REMOTE_ERRORS } from "../../errors";

export default class SetRemote extends Command {
  static description = "set the remote";

  static args = [
    {
      name: "remote",
      description: "the URL to set the remote to",
      required: true
    }
  ];

  async run(): Promise<void> {
    const { args } = this.parse(SetRemote);

    const url = new URL(args.remote);
    const protocol = url.protocol.slice(0, -1);
    const remote = url.toString();

    if (!["http", "https"].includes(protocol)) return this.error(REMOTE_ERRORS.INVALID_PROTOCOL);
    if (protocol === "http") this.warn("An HTTPS remote should always be used whenever possible.");

    this.settings.update({ remote });
    this.log(`The remote has been successfully set to '${remote}'!`);
  }
}
