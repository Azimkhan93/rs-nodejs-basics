import { createGunzip } from "zlib";
import { fileURLToPath } from "url";
import { createReadStream, createWriteStream } from "fs";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
    const gunzip = createGunzip()
    const filePath = join(__dirname, "files", "archive.gz");
    const unarchivedFilePath = join(__dirname, "files", "fileToCompress.txt");
    const inp = createReadStream(filePath);
    const out = createWriteStream(unarchivedFilePath);

    await new Promise((resolve, reject) => {
        inp.pipe(gunzip)
        .on('error', (error) => reject(error))
        .pipe(out)
        .on('error', (error) => reject(error))
        .on('finish', ()=> resolve('Success'))
    })
    
};

await decompress();