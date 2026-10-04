import React from 'react';
import { Users, Trophy, MessageSquare, Code2 } from 'lucide-react';

// A mixed bento of stat tiles and feature tiles — deliberately uneven sizes
// so it doesn't read as "just another stats row."
export default function CommunitySection() {
  return (
    <div className="community-bento">
      <div className="community-tile stat wide">
        <span className="tile-num">150+</span>
        <span className="tile-label">Active Members</span>
      </div>
      <div className="community-tile feature">
        <Trophy size={18} />
        <h4>Problem of the Week</h4>
        <p>A shared challenge posted every Monday, discussed every Friday.</p>
      </div>
      <div className="community-tile feature">
        <MessageSquare size={18} />
        <h4>Peer Code Review</h4>
        <p>Submit a solution, get feedback on style and approach — not just correctness.</p>
      </div>
      <div className="community-tile stat">
        <span className="tile-num">80+</span>
        <span className="tile-label">Patterns Solved Together</span>
      </div>
      <div className="community-tile feature wide">
        <Users size={18} />
        <h4>Mentor-Led Doubt Sessions</h4>
        <p>Stuck for more than 20 minutes? Bring it to the next session instead of stalling alone.</p>
      </div>
      <div className="community-tile stat">
        <Code2 size={18} />
        <span className="tile-label">Live Pair Programming</span>
      </div>
    </div>
  );
}
