const express = require("express");

const healthRoutes = require("./routes/health.routes");
const {
  notFound,
} = require("./middlewares/not-found.middleware");

const app = express();

app.use(express.json());

app.use("/health", healthRoutes);

app.use(notFound);

module.exports = app;