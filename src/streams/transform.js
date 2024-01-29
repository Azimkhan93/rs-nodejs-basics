import { Transform } from "stream";
import { stdin, stdout } from "process";

const transform = async () => {
  return new Promise((resolve, reject) => {
    try {
      const enteredData = new Transform({
        transform(data, encoding, callback) {
          const reversedData = `${data
            .toString()
            .split("")
            .reverse()
            .join("")}\n`;
          this.push(reversedData);
          callback();
        },
      });
      
      enteredData.on("error", (err) => {
        console.error("Error transforming data:", err);
        reject(err);
      });

      enteredData.on("end", () => {
        resolve();
      });

      stdin.pipe(enteredData).pipe(stdout);
    } catch (err) {
      console.error("Error in transform:", err);
      reject(err);
    }
  });
};

await transform();
