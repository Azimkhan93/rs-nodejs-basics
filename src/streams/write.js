import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { stdin } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const filePath = join(__dirname, "files", "fileToWrite.txt");
  const writeStream = createWriteStream(filePath);

  stdin.pipe(writeStream);

  writeStream.on("error", (err) => {
    console.error("Error reading the file:", err);
  });
};

await write();
