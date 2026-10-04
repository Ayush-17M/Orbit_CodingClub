import React from 'react';

const chips = [
  { big: 'O(1)', label: 'Constant' },
  { big: 'O(log n)', label: 'Logarithmic' },
  { big: 'O(n log n)', label: 'Linearithmic' },
  { big: 'O(n²)', label: 'Quadratic' },
];

// A small comparative growth chart — four polylines on the same axes so the
// gap between "fast enough" and "times out" is visible, not just stated.
function GrowthChart() {
  return (
    <svg className="growth-chart" viewBox="0 0 260 160" fill="none">
      <line x1="10" y1="150" x2="250" y2="150" stroke="rgba(255,255,255,0.15)" />
      <line x1="10" y1="150" x2="10" y2="10" stroke="rgba(255,255,255,0.15)" />
      <polyline points="10,140 250,140" stroke="#3E7BFA" strokeWidth="2" />
      <polyline points="10,148 60,120 110,105 160,94 210,86 250,80" stroke="#2FBF71" strokeWidth="2" fill="none" />
      <polyline points="10,150 60,110 110,75 160,50 210,30 250,15" stroke="#FF5B2E" strokeWidth="2" fill="none" />
      <polyline points="10,150 40,120 70,80 100,45 130,18 150,5" stroke="#B15BFF" strokeWidth="2" fill="none" />
    </svg>
  );
}

export default function ComplexitySection() {
  return (
    <div className="complexity-grid">
      <div className="complexity-chips">
        {chips.map((c) => (
          <div className="complexity-chip-card" key={c.big}>
            <span className="chip-big">{c.big}</span>
            <span className="chip-label">{c.label}</span>
          </div>
        ))}
      </div>
      <div className="complexity-chart-wrap">
        <GrowthChart />
        <p className="chart-caption">Growth rate as input size increases — the reason "it works" isn't the same as "it scales."</p>
      </div>
    </div>
  );
}
