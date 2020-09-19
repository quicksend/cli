import { Got, Progress } from "got";

import FormData = require("form-data");

import {
  EntryResponseInterface,
  IdentifyResponseInterface
} from "./interfaces/responses.interface";

export class API {
  constructor(private readonly got: Got) {}

  identify(key?: string): Promise<IdentifyResponseInterface> {
    const headers = key ? { authorization: key } : this.got.defaults.options.headers;

    return this.got
      .get<IdentifyResponseInterface>("users/@me/identify", { headers })
      .json();
  }

  upload(
    form: FormData,
    flags: { folder?: string; public?: boolean },
    progressListener?: (progress: Progress) => void
  ): Promise<EntryResponseInterface[]> {
    return this.got
      .post<EntryResponseInterface[]>("files/upload", {
        body: form,
        headers: form.getHeaders(),
        searchParams: {
          folder: flags.folder && flags.folder !== "/" ? flags.folder : undefined,
          public: flags.public
        }
      })
      .on("uploadProgress", (progress) => progressListener && progressListener(progress))
      .json();
  }
}
