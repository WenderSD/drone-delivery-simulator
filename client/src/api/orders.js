const BASE_URL = "http://localhost:4000/api";

export async function createOrder(order) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return res.json();
}

export async function fetchOrders() {
  const res = await fetch(`${BASE_URL}/orders`);
  return res.json();
}

export async function deleteOrder(id) {
  await fetch(`${BASE_URL}/orders/${id}`, { method: "DELETE" });
}

export async function simulateDeliveries() {
  const res = await fetch(`${BASE_URL}/simulate`);
  return res.json();
}
