const notFound = (req, res) => {
  res.status(404).json({
    ok: false,
    message: `Ruta ${req.method} ${req.originalUrl} no encontrada`,
  });
};

module.exports = {
  notFound,
};