const path = require("node:path");

const {
  readJsonFile,
} = require("../utils/json-file.util");

const ITEMS_FILE = path.join(
  __dirname,
  "..",
  "data",
  "items.json"
);

const getItems = async ({ userId, search }) => {
  const items = await readJsonFile(ITEMS_FILE);

  const userItems = items.filter(
    (item) => item.createdBy === userId
  );

  const normalizedSearch = String(search || "")
    .trim()
    .toLowerCase();

  if (!normalizedSearch) {
    return userItems;
  }

  return userItems.filter((item) => {
    const title = String(item.title || "").toLowerCase();
    const description = String(
      item.description || ""
    ).toLowerCase();

    return (
      title.includes(normalizedSearch) ||
      description.includes(normalizedSearch)
    );
  });
};

module.exports = {
  getItems,
};