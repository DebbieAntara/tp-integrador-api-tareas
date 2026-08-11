const { randomUUID } = require("node:crypto");

const createItem = ({
  title,
  description,
  status,
  priority,
  dueDate,
  createdBy,
}) => {
  const now = new Date().toISOString();

  return {
    id: randomUUID(),
    title: title.trim(),
    description: description?.trim() || "",
    status: status || "pendiente",
    priority: priority || "media",
    dueDate: dueDate || null,
    createdBy,
    createdAt: now,
    updatedAt: now,
  };
};

module.exports = {
  createItem,
};