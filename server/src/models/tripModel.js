const db = require("../db");

async function createTrip(trip) {
  const { drone_id, orders, distance_km, duration_h } = trip;
  const [res] = await db.query(
    "INSERT INTO trips (drone_id, orders_json, distance_km, duration_h, created_at) VALUES (?, ?, ?, ?, NOW())",
    [drone_id, JSON.stringify(orders), distance_km, duration_h]
  );
  return res.insertId;
}

module.exports = { createTrip };
