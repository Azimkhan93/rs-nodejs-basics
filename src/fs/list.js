import { readdir, promises } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  readdir(resolve(__dirname, "files"), function (err, files) {
    if (err) {
      throw Error("FS operation failed");
    } else {
      files.forEach((file) => {
        console.log(file);
      });
    }
  });
};

await list();
