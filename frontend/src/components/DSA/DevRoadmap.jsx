import React from 'react';

const levels = [
  { id: '01', color: '#FF5B2E', label: 'Foundation' },
  { id: '02', color: '#2FBF71', label: 'Core Data Structures' },
  { id: '03', color: '#3E7BFA', label: 'Algorithmic Thinking' },
  { id: '04', color: '#B15BFF', label: 'Advanced Problem Solving' },
];

// Each topic is tagged with the level (0-3) it belongs to, so its marker
// picks up that level's color — ties the two-column list back to the
// stepper on the left without repeating the level name on every row.
const topics = [
  { t: 'Programming Fundamentals', lvl: 0 },
  { t: 'Time & Space Complexity', lvl: 0 },
  { t: 'Sorting Algorithms', lvl: 0 },
  { t: 'Linked List', lvl: 1 },
  { t: 'Stack & Queue', lvl: 1 },
  { t: 'Two Pointers', lvl: 1 },
  { t: 'Sliding Window', lvl: 2 },
  { t: 'Trees & BST', lvl: 2 },
  { t: 'Recursion & Backtracking', lvl: 2 },
  { t: 'Graphs', lvl: 3 },
  { t: 'Dynamic Programming', lvl: 3 },
  { t: 'Greedy Algorithms', lvl: 3 },
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