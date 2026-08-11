const { randomUUID } = require("node:crypto");

const createUser = ({ name, email, passwordHash }) => {
  return {
    id: randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };
};

const getPublicUser = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
};

module.exports = {
  createUser,
  getPublicUser,
};