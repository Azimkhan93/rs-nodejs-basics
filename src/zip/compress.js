import { createGzip } from "zlib";
import { fileURLToPath } from "url";
import { createReadStream, createWriteStream } from "fs";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
    const gzip = createGzip()
    const filePath = join(__dirname, "files", "fileToCompress.txt");
    const archivedFilePath = join(__dirname, "files", "compressed.txt.gz");
    const inp = createReadStream(filePath);
    const out = createWriteStream(archivedFilePath);

    await new Promise((resolve, reject) => {
        inp.pipe(gzip)
        .on('error', (error) => reject(error))
        .pipe(out)
        .on('error', (error) => reject(error))
        .on('finish', ()=> resolve('Success'))
    })
    
};

await compress();
