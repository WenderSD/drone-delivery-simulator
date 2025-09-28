const express = require("express");
const router = express.Router();
const {
  postOrder,
  listOrders,
  deleteOrder,
} = require("../controllers/orderController");
const { simulate } = require("../controllers/simulateController");

router.post("/orders", postOrder);
router.get("/orders", listOrders);
router.delete("/orders/:id", deleteOrder);
router.get("/simulate", simulate);

module.exports = router;
