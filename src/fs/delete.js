import { unlink } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
    const filePath = join(__dirname, "files", "fileToRemove.txt");
    
    unlink(filePath, err => {
        if (err) {
            throw Error("FS operation failed");
        } else {
          console.log(`File was deleted successfully`);
        }
      });


};

await remove();