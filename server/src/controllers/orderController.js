const {
  createOrder,
  getAllOrders,
  deleteOrderById,
} = require("../models/orderModel");

async function postOrder(req, res) {
  const { x, y, weight, priority } = req.body;
  if (
    typeof x !== "number" ||
    typeof y !== "number" ||
    typeof weight !== "number"
  ) {
    return res.status(400).json({ error: "invalid_payload" });
  }
  if (!["low", "medium", "high"].includes(priority))
    return res.status(400).json({ error: "invalid_priority" });
  const order = await createOrder({ x, y, weight, priority });
  res.status(201).json(order);
}

async function listOrders(req, res) {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "failed_to_list_orders" });
  }
}

async function deleteOrder(req, res) {
  const { id } = req.params;
  try {
    await deleteOrderById(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "failed_to_delete_order" });
  }
}

module.exports = { postOrder, listOrders, deleteOrder };
