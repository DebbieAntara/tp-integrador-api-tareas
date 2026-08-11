const getHealth = (_req, res) => {
  res.status(200).json({
    ok: true,
    message: "API Gestor de Tareas funcionando correctamente",
  });
};

module.exports = {
  getHealth,
};