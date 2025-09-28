import { useState } from "react";
import { createOrder } from "../api/orders";

export default function OrderForm({ onOrderCreated }) {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [weight, setWeight] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(x) <= 0 || Number(y) <= 0 || Number(x) > 25 || Number(y) > 25) {
      alert("Os valores de X, Y e Peso devem estar entre 1 e 25");
      return;
    }
    if (!Number.isInteger(Number(x)) || !Number.isInteger(Number(y))) {
      alert("As posições X e Y devem ser números inteiros.");
      return;
    }

    if (Number(weight) > 12 || Number(weight) <= 0) {
      alert("O pacote deve ter mais que 0 kg e até 12kg.");
      return;
    }

    const order = await createOrder({
      x: Number(x),
      y: Number(y),
      weight: Number(weight),
      priority,
    });
    onOrderCreated(order);
    setX("");
    setY("");
    setWeight("");
    setPriority("low");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="positionX">
        <span>Position X (1 - 25):</span>

        <input
          name="X"
          type="number"
          placeholder="X (Km)"
          value={x}
          min={1}
          onChange={(e) => setX(e.target.value)}
        />
      </div>

      <div className="positionY">
        <span>Position Y (1 - 25):</span>
        <input
          type="number"
          placeholder="Y (Km)"
          value={y}
          min={1}
          onChange={(e) => setY(e.target.value)}
        />
      </div>

      <div className="weight">
        <span>Weight (max: 12)</span>
        <input
          type="number"
          placeholder="Weight (kg):"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <div className="priority">
        <span>Priority:</span>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <button type="submit">Create Order</button>
    </form>
  );
}
