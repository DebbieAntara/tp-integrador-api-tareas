const express = require("express");

const healthRoutes = require("./routes/health.routes");
const userRoutes = require("./routes/user.routes");
const itemRoutes = require("./routes/item.routes");

const {
  notFound,
} = require("./middlewares/not-found.middleware");

const {
  errorHandler,
} = require("./middlewares/error-handler.middleware");

const app = express();

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/users", userRoutes);
app.use("/items", itemRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;