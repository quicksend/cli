import * as path from "path";

import got from "got";

import OclifCommand from "@oclif/command";

import { API } from "./api";

import { APPLICATION_KEY_ERRORS, REMOTE_ERRORS } from "./errors";

import { ErrorResponseInterface } from "./interfaces/responses.interface";
import { SettingsInterface } from "./interfaces/settings.interface";

import { Settings } from "./utils/settings";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("../package.json");

export abstract class Command extends OclifCommand {
  protected readonly settings = new Settings<SettingsInterface>(
    path.join(this.config.configDir, "config.json")
  );

  protected readonly got = got.extend({
    headers: {
      "user-agent": `${pkg.name}/${pkg.version} (${pkg.homepage})`
    },
    hooks: {
      beforeError: [
        (error) => {
          if (error instanceof got.HTTPError) {
            const { body, statusCode } = error.response;
            const { message } = body as ErrorResponseInterface;

            if (statusCode >= 500) error.message = "An error has occurred, please try again later!";
            else error.message = Array.isArray(message) ? message.join("\n") : message;
          }

          return error;
        }
      ],

      beforeRequest: [
        (options) => {
          const { key } = this.settings.read();

          if (key) {
            options.headers = {
              authorization: key,
              ...options.headers
            };
          }
        }
      ]
    },
    prefixUrl: this.settings.read().remote,
    responseType: "json"
  });

  protected readonly bytebin = new API(this.got);

  protected readonly requireKey?: boolean;

  protected readonly requireRemote?: boolean;

  async init(): Promise<void> {
    if (!this.requireKey && !this.requireRemote) return;

    const { key, remote } = this.settings.read();

    if (this.requireKey && !key) return this.error(APPLICATION_KEY_ERRORS.UNSET);
    if (this.requireRemote && !remote) return this.error(REMOTE_ERRORS.UNSET);
  }

  async catch(error: Error): Promise<void> {
    if (error instanceof got.RequestError) this.error(error.message);
    else super.catch(error);
  }
}
