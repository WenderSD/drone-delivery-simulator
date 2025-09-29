import { useState, useEffect } from "react";
import OrderForm from "./components/OrderForm";
import StatsPanel from "./components/StatsPanel";
import DeliveryMap from "./components/DeliveryMap";
import "./index.css";
import { fetchOrders, simulateDeliveries, deleteOrder } from "./api/orders";

export default function App() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  const handleOrderCreated = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const handleSimulate = async () => {
    const result = await simulateDeliveries();
    setStats(result);
    const updatedOrders = await fetchOrders();
    setOrders(updatedOrders);
  };

  const handleDelete = async (id) => {
    await deleteOrder(id);
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="App">
      <h1>Delivery Drones</h1>
      <div className="flexBox">
        <div className="formContainer">
          <OrderForm onOrderCreated={handleOrderCreated} />
        </div>

        {/* Mostrar lista de pedidos */}

        <div className="ordersContainer">
          <h2>Orders</h2>
          <div className="tableOrders">
            <table>
              <thead>
                <tr>
                  <th>X</th>
                  <th>Y</th>
                  <th>Weight (kg)</th>
                  <th>Priority</th>
                  <th>Stats</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.x}</td>
                    <td>{o.y}</td>
                    <td>{o.weight}</td>
                    <td>{o.priority}</td>
                    <td>{o.status || "pending"}</td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => handleDelete(o.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <StatsPanel stats={stats} />
        </div>

        <div className="simulateContainer">
          <button className="simular" onClick={handleSimulate}>
            Simulate Deliveries
          </button>

          <h3>Delivery Map</h3>

          <DeliveryMap trips={stats?.trips} />
        </div>
      </div>
    </div>
  );
}
