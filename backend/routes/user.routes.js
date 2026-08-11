const express = require("express");

const {
  register,
} = require("../controllers/user.controller");

const {
  registerUserSchema,
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

module.exports = router;