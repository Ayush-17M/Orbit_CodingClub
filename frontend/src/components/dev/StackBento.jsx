import React from 'react';
import { Code2, Database, Server, GitBranch, Cloud, ShieldCheck, Boxes, Workflow } from 'lucide-react';

const topics = [
  { icon: Code2, title: 'Frontend Systems', desc: 'Accessible interfaces, reusable components, and fast client-side experiences.' },
  { icon: Server, title: 'Backend Services', desc: 'Reliable APIs, business logic, and services designed for real-world traffic.' },
  { icon: Database, title: 'Data Architecture', desc: 'Schema design, query performance, and dependable persistence strategies.' },
  { icon: GitBranch, title: 'Version Control', desc: 'Collaborative Git workflows, code review, and release-ready branches.' },
  { icon: Cloud, title: 'Cloud Infrastructure', desc: 'Deploy, observe, and scale applications with modern cloud platforms.' },
  { icon: ShieldCheck, title: 'Security & Quality', desc: 'Build secure defaults, automated checks, and maintainable production code.' },
  { icon: Boxes, title: 'System Design', desc: 'Compose resilient services with clear boundaries and useful abstractions.' },
  { icon: Workflow, title: 'Delivery Pipelines', desc: 'Automate testing and deployment so teams can ship changes with confidence.' },
];

export default function StackBento() {
  return (
    <div className="stack-bento">
      {topics.map((t) => (
        <div className="bento-card" key={t.title}>
          <div className="bento-icon"><t.icon size={18} /></div>
          <h3>{t.title}</h3>
          <p>{t.desc}</p>
        </div>
      ))}
    </div>
  );
}
