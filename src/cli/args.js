const parseArgs = () => {
  const args = process.argv.slice(2);

  const argsObj = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const propName = args[i].slice(2);

      if (i + 1 < args.length && !args[i + 1].startsWith("--")) {
        argsObj[propName] = args[i + 1];
        i++;
      } else {
        argsObj[propName] = true;
      }
    }
  }

  for (const propName in argsObj) {
    console.log(`${propName} is ${argsObj[propName]}`);
  }
};

parseArgs();
