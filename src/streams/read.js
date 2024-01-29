import { createReadStream } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { stdout } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = join(__dirname, "files", "fileToRead.txt");
  const readStream = createReadStream(filePath);

  readStream.on("data", (data) => {
    stdout.write(data)
  });
  
  readStream.on('error', (err) => {
    console.error('Error reading the file:', err);
  });
};

await read();
