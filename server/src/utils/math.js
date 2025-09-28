function distance(a, b) {
  // Distância euclidiana
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

module.exports = { distance };
