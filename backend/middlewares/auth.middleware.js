const {
  verifyToken,
} = require("../utils/jwt.util");

const authenticate = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      ok: false,
      message: "Se requiere un token de autenticación",
    });
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      ok: false,
      message: "El formato del token no es válido",
    });
  }

  try {
    const payload = verifyToken(token);

    req.user = {
      id: payload.sub,
      email: payload.email,
    };

    next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError"
        ? "El token ha expirado"
        : "El token no es válido";

    return res.status(401).json({
      ok: false,
      message,
    });
  }
};

module.exports = {
  authenticate,
};