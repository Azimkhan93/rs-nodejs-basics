import { createReadStream } from "fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  const filePath = join(__dirname, "files", "fileToCalculateHashFor.txt");

  const readStream = createReadStream(filePath);
  const hash = createHash("sha256");
  
  readStream.on("data", (data) => {
    hash.update(data);
  });

  readStream.on("end", () => {
    const hashResult = hash.digest("hex");
    console.log(`Hash result is ${hashResult}`);
  });

  readStream.on("error", (error) => {
    console.error(`Error reading file: ${error.message}`);
  });
};

await calculateHash();
