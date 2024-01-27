import { readdir, promises } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const fsPromises = promises;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  readdir(resolve(__dirname, "files"), function (err, files) {
    if (!err) {
      readdir(resolve(__dirname, "files-copy"), function (err) {
        if (!err) {
            throw Error('FS operation failed')
        } else {
          fsPromises.mkdir(resolve(__dirname, "files-copy"));
          files.forEach(function (file) {
            fsPromises.copyFile(
              resolve(__dirname, "files", file),
              resolve(__dirname, "files-copy", file)
            );
            console.log(file);
          });
        }
      });
    } else {
        throw Error('FS operation failed')
    }
  });
};

await copy();
