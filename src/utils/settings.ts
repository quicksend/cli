import * as fs from "fs";

export class Settings<T extends Record<string, unknown>> {
  constructor(private readonly path: fs.PathLike) {}

  delete(key: string): T {
    const settings = this.read();

    if (settings[key]) {
      delete settings[key];
      this.write(settings);
    }

    return settings;
  }

  read(): T {
    try {
      return JSON.parse(fs.readFileSync(this.path).toString());
    } catch (error) {
      if (error.code === "ENOENT") {
        return this.write({} as T);
      }

      throw error;
    }
  }

  update(data: Partial<T>): T {
    return this.write({ ...this.read(), ...data });
  }

  write(data: T): T {
    fs.writeFileSync(this.path, JSON.stringify(data, null, 2));

    return data;
  }
}
