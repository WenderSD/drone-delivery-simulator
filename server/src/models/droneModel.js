const db = require("../db");

async function getDrones() {
  const [rows] = await db.query("SELECT * FROM drones");
  return rows;
}

module.exports = { getDrones };
