import { readFile } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = join(__dirname, "files", "fileToRead.txt");
  readFile(filePath, "utf8", (err, data) => {
    if (err) {
      throw Error("FS operation failed");
    }
    console.log(data);
  });
};

await read();
