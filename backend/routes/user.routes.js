const express = require("express");

const {
  register,
  login,
} = require("../controllers/user.controller");

const {
  registerUserSchema,
  loginUserSchema,
} = require("../schemas/user.schema");

const {
  validateBody,
} = require("../middlewares/validate-body.middleware");

const router = express.Router();

router.post(
  "/register",
  validateBody(registerUserSchema),
  register
);

router.post(
  "/login",
  validateBody(loginUserSchema),
  login
);

module.exports = router;