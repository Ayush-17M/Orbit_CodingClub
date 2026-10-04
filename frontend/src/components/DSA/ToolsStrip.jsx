import React from 'react';

const platforms = ['LeetCode', 'Codeforces', 'HackerRank', 'CodeChef', 'GeeksforGeeks', 'AtCoder'];

export default function ToolsStrip() {
  return (
    <div className="tools-strip">
      {platforms.map((p) => (
        <div className="tool-tile" key={p}>{p}</div>
      ))}
    </div>
  );
}
