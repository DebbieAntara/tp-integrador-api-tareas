const fs = require("node:fs/promises");

const readJsonFile = async (filePath) => {
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content);
};

const writeJsonFile = async (filePath, data) => {
  const content = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, content, "utf8");
};

module.exports = {
  readJsonFile,
  writeJsonFile,
};