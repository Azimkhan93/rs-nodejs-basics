import { access, constants, rename as fileRename } from "fs";
import { fileURLToPath } from "url";
import { join, dirname, extname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  const filePath = join(__dirname, "files", "wrongFilename.txt");
  const newFilePath = join(__dirname, "files", "properFilename.md");
  const extension = extname(filePath);
  console.log("1:", filePath, "2:", newFilePath, "3:", extension);
  access(newFilePath, constants.F_OK, (err) => {
    if (!err) {
      throw Error("FS operation failed");
    }
  });
  access(filePath, constants.F_OK, (err) => {
    if (err && extension !== ".txt") {
      throw Error("FS operation failed");
    } else {
      fileRename(filePath, newFilePath, () => {
        console.log(`Rename was successful`);
      });
    }
  });
};

await rename();
