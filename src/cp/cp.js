import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { stdin, stdout, exit } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
  const filePath = join(__dirname, "files", "script.js");
  const childProcess = spawn("node", [filePath, ...args]);
  stdin.pipe(childProcess.stdin);
  childProcess.stdout.on("data", (data) => {
    const receivedData = data.toString();
    stdout.write(`Received from child process: ${receivedData}`);
  });

  childProcess.on("exit", (code, signal) => {
    console.log(`Child process exited with code ${code} and signal ${signal}`);
    exit(code);
  });
};

spawnChildProcess(['Rolling', 'Scopes', 'School']);
