const errorHandler = (error, _req, res, _next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      ok: false,
      message: "El cuerpo JSON no tiene un formato válido",
    });
  }

  const statusCode =
    error.statusCode || error.status || 500;

  if (statusCode >= 500) {
    console.error(error);
  }

  return res.status(statusCode).json({
    ok: false,
    message:
      statusCode >= 500
        ? "Ocurrió un error interno en el servidor"
        : error.message,
  });
};

module.exports = {
  errorHandler,
};