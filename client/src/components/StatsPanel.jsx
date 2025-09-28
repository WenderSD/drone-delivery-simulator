export default function StatsPanel({ stats }) {
  const totalDeliveries = stats?.totalDeliveries ?? "-";
  const avgDuration =
    stats && typeof stats.avgDuration === "number"
      ? stats.avgDuration.toFixed(2)
      : "-";
  const droneId =
    stats?.trips && stats.trips.length > 0 ? stats.trips[0].drone_id : "-";

  return (
    <div className="StatsPanel">
      <div className="card">
        <p>Deliveries made:</p>
        <span>{totalDeliveries}</span>
      </div>

      <div className="card">
        <p>Average time per delivery:</p>
        <span>{avgDuration}h</span>
      </div>

      <div className="card">
        <p>Most efficient drone:</p>
        <span>{droneId}</span>
      </div>
    </div>
  );
}
