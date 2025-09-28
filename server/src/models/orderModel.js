const db = require("../db");

async function createOrder(order) {
  const { x, y, weight, priority } = order;
  const [res] = await db.query(
    "INSERT INTO orders (x, y, weight, priority, status, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
    [x, y, weight, priority, "pending"]
  );
  return { id: res.insertId, ...order };
}

async function getAllOrders() {
  const [rows] = await db.query(
    "SELECT * FROM orders ORDER BY created_at DESC"
  );
  return rows;
}

async function deleteOrderById(orderId) {
  await db.query("DELETE FROM orders WHERE id = ?", [orderId]);
}

async function getPendingOrders() {
  const [rows] = await db.query(
    'SELECT * FROM orders WHERE status = "pending" ORDER BY FIELD(priority, "high","medium","low"), created_at'
  );
  return rows;
}

async function markOrdersAsAssigned(orderIds, tripId) {
  if (!orderIds.length) return;
  const idsStr = orderIds.join(",");
  await db.query(
    `UPDATE orders SET status = 'assigned', trip_id = ? WHERE id IN (${idsStr})`,
    [tripId]
  );
}

async function markOrdersAsDelivered(orderIds) {
  if (!orderIds.length) return;
  await db.query(
    `UPDATE orders SET status = 'delivered' WHERE id IN (${orderIds
      .map(() => "?")
      .join(",")})`,
    orderIds
  );
}

async function markOrdersAsUndelivered(orderIds) {
  if (!orderIds.length) return;
  await db.query(
    `UPDATE orders SET status = 'undelivered' WHERE id IN (${orderIds
      .map(() => "?")
      .join(",")})`,
    orderIds
  );
}

module.exports = {
  createOrder,
  getPendingOrders,
  markOrdersAsAssigned,
  markOrdersAsDelivered,
  markOrdersAsUndelivered,
  getAllOrders,
  deleteOrderById,
};
