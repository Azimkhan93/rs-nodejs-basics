import { Worker } from "worker_threads";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { cpus } from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, "worker.js");
const initValue = 10;
const numCores = cpus().length;
const workers = [];

function runService(dataToPass) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(filePath, { workerData: dataToPass });
    worker.on("message", (data) =>
      resolve({
        status: "resolved",
        data,
      })
    );
    worker.on("error", () =>
      resolve({
        status: "error",
        data: null,
      })
    );
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

const performCalculations = async () => {
  for (let i = 0; i < numCores; i++) {
    workers.push(runService(initValue + i));
  }
  const result = await Promise.all(workers);
  console.log(result);
};

await performCalculations();
