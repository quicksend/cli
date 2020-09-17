import { createReadStream } from "fs";
import { URL } from "url";

import cli from "cli-ux";

import prettyBytes = require("pretty-bytes");
import terminalLink = require("terminal-link");

import { flags } from "@oclif/command";

import { Command } from "../command";

import { FormData } from "../utils/form-data";

export default class Upload extends Command {
  static description = "upload file(s)";

  static flags = {
    ...cli.table.flags(),

    file: flags.string({
      char: "f",
      description: "the file to upload",
      multiple: true,
      required: true
    }),

    folder: flags.string({
      char: "F",
      default: "/",
      description: "the folder to upload to"
    }),

    public: flags.boolean({
      allowNo: true,
      char: "p",
      default: false,
      description: "whether this file should be public or not"
    })
  };

  requireKey = true;
  requireRemote = true;

  async run(): Promise<void> {
    const { flags } = this.parse(Upload);
    const { remote } = this.settings.read();

    const form = new FormData();

    for (const path of flags.file as string[]) {
      form.append("file", createReadStream(path).on("error", this.error));
    }

    const transferTotal = await form.getLengthAsync();

    const progressBar = cli.progress({
      barCompleteChar: "\u2588",
      barIncompleteChar: "\u2591",
      clearOnComplete: true,
      etaBuffer: 1000,
      format:
        "Upload Progress |" +
        "{bar}" +
        "| {percentage}% | ETA: {eta}s | {transferred}/{transferTotal}",
      stopOnComplete: true
    });

    progressBar.start(1, 0, {
      transferred: prettyBytes(0),
      transferTotal: prettyBytes(transferTotal)
    });

    const files = await this.bytebin.upload(form, flags, (progress) => {
      progressBar.update(progress.percent, { transferred: prettyBytes(progress.transferred) });
      progressBar.updateETA();
    });

    cli.table(
      files,
      {
        filename: {
          get: (row) => row.name + " ".repeat(2)
        },
        path: {
          get: (row) => row.path.split("/").slice(0, -1).join("/") || "/(root)",
          minWidth: 9
        },
        size: {
          get: (row) => prettyBytes(row.size),
          minWidth: 9
        },
        public: {
          get: (row) => (row.public ? "Yes" : "No"),
          minWidth: 9
        },
        link: {
          get: (row) =>
            terminalLink("Download", new URL(`/files/${row.id}/download`, remote).toString(), {
              fallback: (_, url) => url
            })
        }
      },
      {
        printLine: this.log,
        ...flags
      }
    );
  }
}
