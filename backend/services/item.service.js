const path = require("node:path");

const {
  readJsonFile,
  writeJsonFile,
} = require("../utils/json-file.util");

const {
  createItem,
} = require("../models/item.model");

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
    const title = String(
      item.title || ""
    ).toLowerCase();

    const description = String(
      item.description || ""
    ).toLowerCase();

    return (
      title.includes(normalizedSearch) ||
      description.includes(normalizedSearch)
    );
  });
};

const createItemForUser = async ({
  userId,
  itemData,
}) => {
  const items = await readJsonFile(ITEMS_FILE);

  const newItem = createItem({
    ...itemData,
    createdBy: userId,
  });

  items.push(newItem);

  await writeJsonFile(ITEMS_FILE, items);

  return newItem;
};

const updateItemForUser = async ({
  userId,
  itemId,
  itemData,
}) => {
  const items = await readJsonFile(ITEMS_FILE);

  const itemIndex = items.findIndex(
    (item) =>
      item.id === itemId &&
      item.createdBy === userId
  );

  if (itemIndex === -1) {
    const error = new Error(
      "Tarea no encontrada"
    );

    error.statusCode = 404;
    throw error;
  }

  const updatedItem = {
    ...items[itemIndex],
    ...itemData,
    updatedAt: new Date().toISOString(),
  };

  items[itemIndex] = updatedItem;

  await writeJsonFile(ITEMS_FILE, items);

  return updatedItem;
};

module.exports = {
  getItems,
  createItemForUser,
  updateItemForUser,
};