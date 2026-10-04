import React from 'react';

const keys = Array.from({ length: 28 });

export default function CodingVisual() {
  return (
    <div className="coding-visual" aria-hidden="true">
      <div className="culture-doodle culture-doodle-code">{'</>'}</div>
      <div className="culture-doodle culture-doodle-bolt">↗</div>

      <div className="culture-chat culture-chat-top">
        <span className="culture-avatar">M</span>
        <span>this build is fire</span>
        <b>✦</b>
      </div>

      <div className="culture-chat culture-chat-bottom">
        <span className="culture-online-dot" />
        <span>3 friends coding</span>
      </div>

      <div className="culture-laptop">
        <div className="culture-laptop-lid">
          <div className="culture-editor-tabs">
            <span className="culture-tab-active">app.jsx</span>
            <span>ideas.md</span>
            <b>⌘ S</b>
          </div>

          <div className="culture-editor">
            <div className="culture-line-numbers">01<br />02<br />03<br />04<br />05</div>
            <div className="culture-code-lines">
              <p><i>const</i> <strong>crew</strong> = <em>online</em></p>
              <p className="culture-indent"><i>await</i> <strong>ship</strong><span>()</span></p>
              <p><i>if</i> <span>(</span><strong>vibe</strong><span>)</span> <em>buildMore</em><span>()</span></p>
              <p className="culture-comment">// learn. make. repeat.</p>
              <p className="culture-live-line"><b>›</b> deploy --now <span /></p>
            </div>
            <div className="culture-collab-cursor">ria is here</div>
          </div>

          <div className="culture-editor-status">
            <span>main</span>
            <span>● no errors</span>
            <span>⌁ live</span>
          </div>
        </div>

        <div className="culture-laptop-deck">
          <div className="culture-keyboard">
            {keys.map((_, index) => <span key={index} />)}
          </div>
          <div className="culture-trackpad" />
        </div>

        <div className="culture-sticker culture-sticker-ship">SHIP IT</div>
        <div className="culture-sticker culture-sticker-heart">♥</div>
        <div className="culture-sticker culture-sticker-spark">✦</div>
      </div>
    </div>
  );
}
