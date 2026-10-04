import React from 'react';
import { Check } from 'lucide-react';

const codeLines = [
  { n: 1, parts: [{ t: 'router.', c: 'kw' }, { t: 'get', c: 'fn' }, { t: "('/api/projects', async (req, res) => {" }] },
  { n: 2, parts: [{ t: '  const ', c: 'kw' }, { t: 'projects = await projectService.list();' }] },
  { n: 3, parts: [{ t: '  res.', c: 'kw' }, { t: 'status', c: 'fn' }, { t: '(200).json(projects);' }] },
  { n: 4, parts: [{ t: '});' }] },
  { n: 5, parts: [{ t: '' }] },
  { n: 6, parts: [{ t: '// shipped through CI/CD', c: 'fn' }] },
  { n: 7, parts: [{ t: '// monitored in production', c: 'fn' }] },
  { n: 8, parts: [{ t: '}' }] },
];

export default function DevTerminal() {
  return (
    <div className="dev-terminal">
      <div className="terminal-head">
        <div className="dots"><span /><span /><span /></div>
        <span className="filename">projects.routes.js</span>
        <span className="complexity-chip">REST API</span>
      </div>

      <div className="terminal-body">
        <div className="problem-line">
          <span className="label">Service:</span> Project Registry API
        </div>

        <div className="code-block">
          {codeLines.map((line) => (
            <div className="code-line" key={line.n}>
              <span className="ln">{line.n}</span>
              {line.parts.map((p, i) => (
                <span key={i} className={p.c || undefined}>{p.t}</span>
              ))}
            </div>
          ))}
        </div>

        <div className="terminal-stats">
          <div><span className="stat-label">Uptime</span><span className="stat-value">99.9%</span></div>
          <div><span className="stat-label">Deploys</span><span className="stat-value">24/mo</span></div>
          <div><span className="stat-label">Checks</span><span className="stat-value">142</span></div>
        </div>

        <div className="verdict-row">
          <Check size={14} strokeWidth={3} /> DEPLOYED
        </div>
      </div>
    </div>
  );
}
