import React from 'react';
import { ArrowRight } from 'lucide-react';

const stages = [
  { n: '01', title: 'Understand', desc: 'Restate the problem, clarify constraints, and work through examples by hand before writing code.' },
  { n: '02', title: 'Solution', desc: 'Get a correct brute-force approach working first — optimization without correctness is wasted effort.' },
  { n: '03', title: 'Optimize', desc: 'Identify the bottleneck, apply the right pattern, and re-derive the time and space complexity.' },
];

export default function PracticeWorkflow() {
  return (
    <div className="practice-workflow">
      {stages.map((s, i) => (
        <React.Fragment key={s.n}>
          <div className="workflow-card">
            <span className="workflow-num">{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
          {i < stages.length - 1 && (
            <div className="workflow-arrow"><ArrowRight size={20} /></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
