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
        <h3>Design Systems</h3>
        <p>Build a shared component language that keeps product interfaces consistent and easy to evolve.</p>
      </div>

      <div className="pattern-card">
        <div className="pattern-visual sliding-window">
          {[3, 7, 4, 9, 5, 2, 8].map((height, index) => (
            <span key={index} className={`pv-bar ${index >= 2 && index <= 4 ? 'active' : ''}`} style={{ height: `${height * 6}px` }} />
          ))}
        </div>
        <h3>Real-Time Dashboards</h3>
        <p>Stream operational data into clear, responsive views for teams that need to act quickly.</p>
      </div>

      <div className="pattern-card">
        <div className="pattern-visual binary-search">
          <span className="pv-seg full" />
          <span className="pv-seg half" />
          <span className="pv-seg quarter" />
        </div>
        <h3>Service Architecture</h3>
        <p>Split responsibilities into dependable services with clear contracts and observable boundaries.</p>
      </div>

      <div className="pattern-card">
        <div className="pattern-visual backtracking">
          <svg viewBox="0 0 80 50"><path d="M40 5 L15 25 M40 5 L65 25 M15 25 L5 45 M15 25 L25 45 M65 25 L55 45 M65 25 L75 45" stroke="#FF5B2E" strokeWidth="1.5" fill="none" /></svg>
        </div>
        <h3>Developer Tooling</h3>
        <p>Automate repetitive workflows so engineers can focus on shipping useful product changes.</p>
      </div>

      <div className="pattern-card">
        <div className="pattern-visual dp-grid">
          {Array.from({ length: 16 }).map((_, index) => (
            <span key={index} className={index % 5 === 0 ? 'lit' : ''} />
          ))}
        </div>
        <h3>Data Platforms</h3>
        <p>Turn reliable pipelines and well-modeled data into useful product and business capabilities.</p>
      </div>

      <div className="pattern-card">
        <div className="pattern-visual greedy">
          <span className="pv-step" style={{ height: '20%' }} />
          <span className="pv-step" style={{ height: '45%' }} />
          <span className="pv-step" style={{ height: '70%' }} />
          <span className="pv-step active" style={{ height: '95%' }} />
        </div>
        <h3>Cloud Deployments</h3>
        <p>Release resilient applications with automated infrastructure, monitoring, and rollback paths.</p>
      </div>
    </div>
  );
}
