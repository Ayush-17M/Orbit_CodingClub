import React from 'react';
import { ArrowUpRight, Eye, Layers3, MoveUpRight, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import DesignWorkbench from '../../components/Graphics/GraphicsEcosystem';
import SectionHeading from '../../components/ui/SectionHeading';
import '../../styles/dsa-wing.css';
import '../../styles/graphics-wing.css';

const practice = [
  { number: '01', icon: Eye, title: 'Observe', text: 'Find the signal in a brief, a user need, or a visual reference.' },
  { number: '02', icon: PenTool, title: 'Compose', text: 'Use type, color, image, and space to make the message feel clear.' },
  { number: '03', icon: Layers3, title: 'Systemize', text: 'Turn a strong visual direction into reusable assets and layouts.' },
];

export default function GraphicsWing() {
  return (
    <div className="dev-wing-page graphics-wing-page">
      <section className="graphics-wing-hero dev-hero section-black">
        <div className="graphics-wing-hero__top"><span>WING 05 / GRAPHICS & VISUAL DESIGN</span><span>ORBIT CREATIVE PRACTICE — 2026</span></div>
        <div className="graphics-wing-hero__intro dev-hero-container">
          <div className="dev-hero-text">
            <span className="status-badge"><i className="pulsing-dot" /> IDEAS, MADE VISIBLE</span>
            <h1>DESIGN WITH<br /><span className="accent-text">INTENTION.</span></h1>
            <p className="dev-lead">Build visual identities, expressive interfaces, and campaign work with a clear point of view and a thoughtful system behind it.</p>
            <div className="dev-hero-actions">
              <a className="magnetic-btn" href="#workbench">OPEN THE ARTBOARD <ArrowUpRight size={16} /></a>
              <a className="ghost-btn" href="#practice">DESIGN PROCESS</a>
            </div>
          </div>
        </div>
        <div id="workbench" className="graphics-wing-hero__workbench"><DesignWorkbench /></div>
      </section>

      <section id="practice" className="graphics-wing-process section-cream">
        <div className="graphics-wing-process__heading">
          <SectionHeading eyebrow="01 / PRACTICE" title="FROM FIRST SKETCH TO FINAL SYSTEM." />
          <p>Strong visuals come from deliberate choices. Build a repeatable process for making them.</p>
        </div>
        <div className="graphics-wing-process__grid">
          {practice.map(({ number, icon: Icon, title, text }) => (
            <article className="graphics-wing-step" key={number}>
              <span className="graphics-wing-step__number">{number}</span>
              <Icon size={20} />
              <h3>{title}</h3>
              <p>{text}</p>
              <MoveUpRight className="graphics-wing-step__arrow" size={18} />
            </article>
          ))}
        </div>
      </section>

      <section className="graphics-wing-close section-orange">
        <span>02 / MAKE IT MATTER</span>
        <h2>Give good ideas<br />a visual language.</h2>
        <Link to="/about">WORK WITH THE WING <ArrowUpRight size={16} /></Link>
      </section>
    </div>
  );
}