const jwt = require("jsonwebtoken");

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    const error = new Error(
      "JWT_SECRET no está configurado"
    );

    error.statusCode = 500;
    throw error;
  }

  return secret;
};

const createToken = (user) => {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
    },
    getJwtSecret(),
    {
      expiresIn: "2h",
    }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, getJwtSecret());
};

module.exports = {
  createToken,
  verifyToken,
};