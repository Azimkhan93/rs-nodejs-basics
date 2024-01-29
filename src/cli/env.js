const parseEnv = () => {
  const envVariables = process.env;

  const rssVariables = Object.keys(envVariables)
    .filter((key) => key.startsWith("RSS_"))
    .reduce((result, key) => {
      result[key] = envVariables[key];
      return result;
    }, {});

  const formattedVariables = Object.entries(rssVariables)
    .map(([name, value]) => `${name}=${value}`)
    .join("; ");

  console.log(formattedVariables);
};

parseEnv();
