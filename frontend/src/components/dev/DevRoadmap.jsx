import React from 'react';

const levels = [
  { id: '01', color: '#FF5B2E', label: 'Foundation' },
  { id: '02', color: '#2FBF71', label: 'Application Engineering' },
  { id: '03', color: '#3E7BFA', label: 'Production Systems' },
  { id: '04', color: '#B15BFF', label: 'Technical Leadership' },
];

const topics = [
  { t: 'HTML, CSS & JavaScript', lvl: 0 },
  { t: 'Git & Team Workflows', lvl: 0 },
  { t: 'Testing Fundamentals', lvl: 0 },
  { t: 'React & Component Design', lvl: 1 },
  { t: 'APIs & Authentication', lvl: 1 },
  { t: 'SQL & Data Modeling', lvl: 1 },
  { t: 'Node.js Services', lvl: 2 },
  { t: 'Caching & Queues', lvl: 2 },
  { t: 'Observability & Reliability', lvl: 2 },
  { t: 'Cloud Deployment', lvl: 3 },
  { t: 'System Design', lvl: 3 },
  { t: 'Architecture & Mentoring', lvl: 3 },
];

const columns = [topics.slice(0, 6), topics.slice(6, 12)];

export default function DevRoadmap() {
  return (
    <div className="roadmap-grid">
      <div className="roadmap-stepper">
        {levels.map((lvl) => (
          <div className="stepper-item" key={lvl.id}>
            <span className="stepper-dot" style={{ background: lvl.color }} />
            <div>
              <span className="stepper-level">LEVEL {lvl.id}</span>
              <h3>{lvl.label}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="roadmap-topics">
        {columns.map((col, ci) => (
          <ul key={ci}>
            {col.map((topic) => (
              <li key={topic.t}>
                <span className="topic-dot" style={{ background: levels[topic.lvl].color }} />
                {topic.t}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}