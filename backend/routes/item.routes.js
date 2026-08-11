const express = require("express");

const {
  getAllItems,
} = require("../controllers/item.controller");

const {
  authenticate,
} = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authenticate, getAllItems);

module.exports = router;