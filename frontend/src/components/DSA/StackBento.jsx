import React from 'react';
import { Rows3, Link2, Layers, Hash, GitBranch, Share2, TrendingUp, Sigma } from 'lucide-react';

const topics = [
  { icon: Rows3, title: 'Arrays & Strings', desc: 'Contiguous memory, prefix sums, and in-place manipulation.' },
  { icon: Link2, title: 'Linked Lists', desc: 'Pointer manipulation, cycle detection, and reversal patterns.' },
  { icon: Layers, title: 'Stacks & Queues', desc: 'LIFO/FIFO structures behind parsing, BFS, and monotonic tricks.' },
  { icon: Hash, title: 'Hashing', desc: 'Constant-time lookups that turn brute force into linear time.' },
  { icon: GitBranch, title: 'Trees & BST', desc: 'Traversals, balancing, and search-space reduction.' },
  { icon: Share2, title: 'Graphs', desc: 'Modeling relationships — BFS, DFS, shortest paths, cycles.' },
  { icon: TrendingUp, title: 'Heaps', desc: 'Priority-based access for scheduling and top-K problems.' },
  { icon: Sigma, title: 'Dynamic Programming', desc: 'Breaking problems into overlapping, reusable subproblems.' },
];

export default function StackBento() {
  // const [activeIdx, setActiveIdx] = useState(0);

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
