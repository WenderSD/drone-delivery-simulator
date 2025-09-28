const { getDrones } = require("../models/droneModel");
const {
  getPendingOrders,
  markOrdersAsAssigned,
  markOrdersAsDelivered,
  markOrdersAsUndelivered,
} = require("../models/orderModel");
const { createTrip } = require("../models/tripModel");
const { allocateOrdersToDrones } = require("../services/allocationService");

async function simulate(req, res) {
  try {
    const drones = await getDrones();
    let orders = await getPendingOrders();

    // map DB rows to objeto usado
    orders = orders.map((o) => ({
      id: o.id,
      x: o.x,
      y: o.y,
      weight: o.weight,
      priority: o.priority,
    }));

    const { trips, unassignedOrderIds } = allocateOrdersToDrones(
      orders,
      drones,
      {
        speed_kmh: Number(process.env.DRONE_SPEED_KMH || 50),
      }
    );

    // salvar trips e marcar orders
    for (const t of trips) {
      const tripId = await createTrip(t);
      await markOrdersAsAssigned(t.orders, tripId);

      await markOrdersAsDelivered(t.orders);
    }

    if (unassignedOrderIds && unassignedOrderIds.length) {
      await markOrdersAsUndelivered(unassignedOrderIds);
    }

    // resposta inclui trips + estatísticas simples
    const totalDeliveries = trips.reduce((s, t) => s + t.orders.length, 0);
    const avgDuration = trips.length
      ? trips.reduce((s, t) => s + t.duration_h, 0) / trips.length
      : 0;

    //

    const ordersById = {};
    orders.forEach((o) => {
      ordersById[o.id] = o;
    });

    console.log("TRIPS BEFORE MAPPING:", JSON.stringify(trips, null, 2));

    const tripsWithOrders = trips.map((trip) => ({
      ...trip,
      orders: trip.orders.map((id) => ordersById[id]).filter(Boolean),
    }));

    //
    res.json({
      trips: tripsWithOrders,
      totalDeliveries,
      avgDuration,
      undelivered: unassignedOrderIds,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "simulation_failed", detail: err.message });
  }
}

module.exports = { simulate };
