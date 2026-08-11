const express = require("express");

const {
  getAllItems,
  createNewItem,
} = require("../controllers/item.controller");

const {
  authenticate,
} = require("../middlewares/auth.middleware");

const {
  validateBody,
} = require("../middlewares/validate-body.middleware");

const {
  createItemSchema,
} = require("../schemas/item.schema");

const router = express.Router();

router.get(
  "/",
  authenticate,
  getAllItems
);

router.post(
  "/",
  authenticate,
  validateBody(createItemSchema),
  createNewItem
);

module.exports = router;