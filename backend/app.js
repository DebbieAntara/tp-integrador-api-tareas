const express = require("express");

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    message: "API Gestor de Tareas funcionando correctamente",
  });
});

app.use((_req, res) => {
  res.status(404).json({
    ok: false,
    message: "Ruta no encontrada",
  });
});

module.exports = app;