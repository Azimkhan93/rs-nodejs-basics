import { access, writeFile, constants } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const filePath = join(__dirname, "files", "fresh.txt");
  access(filePath, constants.F_OK, (err) => {
    if (err) {
      writeFile(filePath, "I am fresh and young", { flag: "w" }, (error) => {
        if(error){
          console.log(error);
        }
      });
    } else {
        throw Error('FS opertaion failed')
    }
  });
};

await create();