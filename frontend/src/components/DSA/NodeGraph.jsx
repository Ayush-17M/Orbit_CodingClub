import React from 'react';

// Decorative constellation graphic for the hero — a sparse node/edge graph,
// standing in visually for the "Graphs" data structure without being a
// literal diagram anyone has to read.
export default function NodeGraph() {
  const nodes = [
    { x: 20, y: 30 }, { x: 90, y: 10 }, { x: 150, y: 55 }, { x: 60, y: 90 },
    { x: 130, y: 120 }, { x: 190, y: 90 }, { x: 210, y: 20 }, { x: 40, y: 150 },
  ];
  const edges = [[0,1],[1,2],[0,3],[3,4],[2,5],[5,6],[3,7],[4,5]];

  return (
    <svg className="node-graph" viewBox="0 0 230 170" fill="none" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="rgba(255,91,46,0.35)" strokeWidth="1"
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={i % 3 === 0 ? 4 : 2.5} fill={i % 3 === 0 ? '#FF5B2E' : 'rgba(255,255,255,0.5)'} />
      ))}
    </svg>
  );
}
