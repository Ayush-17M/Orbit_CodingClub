import React from 'react';
import { Check } from 'lucide-react';

// The judge-style code panel in the hero: a real-looking solved problem,
// runtime stats, and an "Accepted" verdict — the single most characteristic
// image in a competitive programmer's world.
//
// Each source line is its own array entry rendered as a block-level <div>
// (rather than raw multi-line JSX text) so line breaks are guaranteed to
// render correctly — JSX collapses whitespace/newlines between sibling
// elements, so relying on source formatting inside a <pre> would silently
// squash this onto one line.
const codeLines = [
  { n: 1, parts: [{ t: 'function ', c: 'kw' }, { t: 'maxSubArray', c: 'fn' }, { t: '(nums) {' }] },
  { n: 2, parts: [{ t: '  let ', c: 'kw' }, { t: 'best = nums[0], cur = nums[0];' }] },
  { n: 3, parts: [{ t: '  for ', c: 'kw' }, { t: '(' }, { t: 'let ', c: 'kw' }, { t: 'i = 1; i < nums.length; i++) {' }] },
  { n: 4, parts: [{ t: '    cur = ' }, { t: 'Math.max', c: 'fn' }, { t: '(nums[i], cur + nums[i]);' }] },
  { n: 5, parts: [{ t: '    best = ' }, { t: 'Math.max', c: 'fn' }, { t: '(best, cur);' }] },
  { n: 6, parts: [{ t: '  }' }] },
  { n: 7, parts: [{ t: '  return ', c: 'kw' }, { t: 'best;' }] },
  { n: 8, parts: [{ t: '}' }] },
];

export default function DevTerminal() {
  return (
    <div className="dev-terminal">
      <div className="terminal-head">
        <div className="dots"><span /><span /><span /></div>
        <span className="filename">maximum_subarray.js</span>
        <span className="complexity-chip">O(n)</span>
      </div>

      <div className="terminal-body">
        <div className="problem-line">
          <span className="label">Problem:</span> Maximum Subarray
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
          <div><span className="stat-label">Runtime</span><span className="stat-value">4ms</span></div>
          <div><span className="stat-label">Beats</span><span className="stat-value">98%</span></div>
          <div><span className="stat-label">Memory</span><span className="stat-value">42.1MB</span></div>
        </div>

        <div className="verdict-row">
          <Check size={14} strokeWidth={3} /> ACCEPTED
        </div>
      </div>
    </div>
  );
}
