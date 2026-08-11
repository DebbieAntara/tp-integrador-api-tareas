const path = require("node:path");
const bcrypt = require("bcryptjs");

const {
  readJsonFile,
  writeJsonFile,
} = require("../utils/json-file.util");

const {
  createUser,
  getPublicUser,
} = require("../models/user.model");

const USERS_FILE = path.join(
  __dirname,
  "..",
  "data",
  "users.json"
);

const registerUser = async ({ name, email, password }) => {
  const users = await readJsonFile(USERS_FILE);

  const normalizedEmail = email.trim().toLowerCase();

  const emailExists = users.some(
    (user) => user.email.toLowerCase() === normalizedEmail
  );

  if (emailExists) {
    const error = new Error(
      "El correo electrónico ya está registrado"
    );

    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = createUser({
    name,
    email: normalizedEmail,
    passwordHash,
  });

  users.push(newUser);

  await writeJsonFile(USERS_FILE, users);

  return getPublicUser(newUser);
};

module.exports = {
  registerUser,
};