import _FormData = require("form-data");

export class FormData extends _FormData {
  getLengthAsync(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.getLength((error, length) => {
        if (error) reject(error);
        else resolve(length);
      });
    });
  }
}
