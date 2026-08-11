const express = require("express");

const {
  getAllItems,
  createNewItem,
  updateExistingItem,
} = require("../controllers/item.controller");

const {
  authenticate,
} = require("../middlewares/auth.middleware");

const {
  validateBody,
} = require("../middlewares/validate-body.middleware");

const {
  createItemSchema,
  updateItemSchema,
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

router.put(
  "/:id",
  authenticate,
  validateBody(updateItemSchema),
  updateExistingItem
);

module.exports = router;