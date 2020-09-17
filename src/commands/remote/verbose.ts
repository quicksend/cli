import { Command } from "../../command";

import { REMOTE_ERRORS } from "../../errors";

export default class Remote extends Command {
  static description = "display the current remote url";

  async run(): Promise<void> {
    const { remote } = this.settings.read();

    if (!remote) this.error(REMOTE_ERRORS.UNSET);
    else this.log(remote);
  }
}
