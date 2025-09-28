const { distance } = require("../utils/math");

/**
 * Heurística de alocação (greedy + prioridade):
 * 1. Ordena pedidos por prioridade (high, medium, low) e depois por criação.
 * 2. Para cada drone (ordenados por capacidade decrescente), monta rotas "viagem" agrupando pedidos
 * enquanto o peso total <= capacidade e rota estimada <= autonomia.
 * 3. Rota estimada: caminho greedily-nearest-neighbor para calcular a distância da rota
 * iniciando na base (0,0) visitando os pontos selecionados e retornando à base.
 */

function nearestNeighborRoute(depot, points) {
  if (!points.length) return { route: [], dist: 0 };
  const remaining = points.slice();
  const route = [];
  let current = { ...depot };
  let total = 0;
  while (remaining.length) {
    let bestIdx = 0;
    let bestD = Infinity;
    for (let i = 0; i < remaining.length; i++) {
      const d = distance(current, remaining[i]);
      if (d < bestD) {
        bestD = d;
        bestIdx = i;
      }
    }
    total += bestD;
    current = remaining.splice(bestIdx, 1)[0];
    route.push(current);
  }
  // voltar ao depósito
  total += distance(current, depot);
  return { route, dist: total };
}

function allocateOrdersToDrones(orders, drones, options = {}) {
  // orders: array de {id, x, y, weight, priority}
  // drones: array de {id, capacity_kg, range_km}
  const depot = options.depot || { x: 0, y: 0 };
  const speed = options.speed_kmh || 50; // usado para estimar duração

  const pending = orders.slice();
  const resultTrips = [];
  const unassignedOrderIds = [];

  // ordena drones por capacidade decrescente (tenta usar grandes primeiro)
  const dronesSorted = drones
    .slice()
    .sort((a, b) => b.capacity_kg - a.capacity_kg);

  while (pending.length) {
    let assignedAny = false;

    for (const drone of dronesSorted) {
      let taken = [];
      let remainingWeight = drone.capacity_kg;

      // estratégia: percorre lista pending e adiciona se couber (first-fit by priority order)
      for (let i = 0; i < pending.length; ) {
        const o = pending[i];
        if (o.weight <= remainingWeight) {
          // tentativa temporária: se incluindo esse pedido a rota fica dentro da autonomia
          const candidate = taken.concat([o]);
          const routeInfo = nearestNeighborRoute(depot, candidate);
          if (routeInfo.dist <= drone.range_km) {
            taken.push(o);
            remainingWeight -= o.weight;
            pending.splice(i, 1);
            continue;
          }
        }
        i++;
      }

      if (taken.length) {
        assignedAny = true;
        const routeInfo = nearestNeighborRoute(depot, taken);
        const duration_h = routeInfo.dist / speed;
        resultTrips.push({
          drone_id: drone.id,
          orders: taken.map((o) => o.id),
          distance_km: +routeInfo.dist.toFixed(3),
          duration_h: +duration_h.toFixed(3),
          drone_capacity: drone.capacity_kg,
        });
      }
    }

    if (!assignedAny) {
      // não foi possível asignar nenhum pedido (talvez um pedido excede a capacidade ou range de todos)
      for (const o of pending) {
        o.unassignable = true;
        unassignedOrderIds.push(o.id);
      }
      break;
    }
  }

  return {
    trips: resultTrips,
    unassignedOrderIds,
  };
}

module.exports = { allocateOrdersToDrones, nearestNeighborRoute };
