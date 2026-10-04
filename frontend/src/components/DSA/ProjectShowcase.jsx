import React from 'react';

export default function ProjectShowcase() {
  return (
    <div className="patterns-bento">
      <div className="pattern-card">
        <div className="pattern-visual two-pointer">
          <span className="pv-line" />
          <span className="pv-dot" style={{ left: '18%' }} />
          <span className="pv-dot" style={{ left: '78%' }} />
        </div>
        <h3>Two Pointers</h3>
        <p>Converge from both ends to cut an O(n²) scan down to O(n).</p>
      </div>

      <div className="pattern-card">
        <div className="pattern-visual sliding-window">
          {[3, 7, 4, 9, 5, 2, 8].map((h, i) => (
            <span key={i} className={`pv-bar ${i >= 2 && i <= 4 ? 'active' : ''}`} style={{ height: `${h * 6}px` }} />
          ))}
        </div>
        <h3>Sliding Window</h3>
        <p>Grow and shrink a range in place instead of recomputing it.</p>
      </div>

      <div className="pattern-card">
        <div className="pattern-visual binary-search">
          <span className="pv-seg full" />
          <span className="pv-seg half" />
          <span className="pv-seg quarter" />
        </div>
        <h3>Binary Search</h3>
        <p>Halve the search space — on arrays, and on the answer itself.</p>
      </div>

      <div className="pattern-card">
        <div className="pattern-visual backtracking">
          <svg viewBox="0 0 80 50"><path d="M40 5 L15 25 M40 5 L65 25 M15 25 L5 45 M15 25 L25 45 M65 25 L55 45 M65 25 L75 45" stroke="#FF5B2E" strokeWidth="1.5" fill="none" /></svg>
        </div>
        <h3>Backtracking</h3>
        <p>Explore, and undo the moment a branch stops being promising.</p>
      </div>

      <div className="pattern-card">
        <div className="pattern-visual dp-grid">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className={i % 5 === 0 ? 'lit' : ''} />
          ))}
        </div>
        <h3>Dynamic Programming</h3>
        <p>Cache subproblem answers so you never solve the same one twice.</p>
      </div>

      <div className="pattern-card">
        <div className="pattern-visual greedy">
          <span className="pv-step" style={{ height: '20%' }} />
          <span className="pv-step" style={{ height: '45%' }} />
          <span className="pv-step" style={{ height: '70%' }} />
          <span className="pv-step active" style={{ height: '95%' }} />
        </div>
        <h3>Greedy</h3>
        <p>Take the locally optimal choice — when it's provably safe to.</p>
      </div>
    </div>
  );
}
