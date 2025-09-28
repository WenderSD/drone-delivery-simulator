import { useEffect, useRef } from "react";

export default function DeliveryMap({ trips }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!trips) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const origin = { x: 50, y: 50 };
    const colors = ["blue", "yellow", "green", "orange", "purple", "brown"];

    // Mapear drone_id para uma cor fixa
    const uniqueDroneIds = [...new Set(trips.map((trip) => trip.drone_id))];
    const droneColorMap = {};
    uniqueDroneIds.forEach((id, idx) => {
      droneColorMap[id] = colors[idx % colors.length];
    });

    trips.forEach((trip) => {
      const color = droneColorMap[trip.drone_id];
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);

      trip.orders.forEach((o) => {
        const x = origin.x + o.x * 11;
        const y = origin.y + o.y * 11;
        ctx.lineTo(x, y);
        ctx.fillRect(x - 4, y - 4, 8, 8);
        ctx.fillText(`Order (${o.x}, ${o.y})`, x + 10, y);
      });

      ctx.stroke();
    });

    // marcar a base 🏠
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = "12px Arial";
    ctx.fillText("Base (0, 0)", origin.x + 10, origin.y);

    // desenhar legenda
    ctx.font = "14px Arial";
    uniqueDroneIds.forEach((id, idx) => {
      const color = droneColorMap[id];
      ctx.fillStyle = color;
      ctx.fillRect(300, 30 + idx * 24, 18, 18);
      ctx.fillStyle = "black";
      ctx.fillText(`Drone ${id}`, 325, 44 + idx * 24);
    });
  }, [trips]);

  return (
    <div className="canvasContainer">
      {" "}
      <canvas
        className="canvas"
        ref={canvasRef}
        width={400}
        height={400}
        style={{}}
      />
    </div>
  );
}
