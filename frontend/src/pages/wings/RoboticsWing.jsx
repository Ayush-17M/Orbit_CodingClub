import React from 'react';
import { ArrowUpRight, Cpu, Radio, Waypoints } from 'lucide-react';
import { Link } from 'react-router-dom';
import MotionBench from '../../components/Robotics/RoboticsEcosystem';
import SectionHeading from '../../components/ui/SectionHeading';
import '../../styles/dsa-wing.css';
import '../../styles/robotics-wing.css';

const systems = [
  { icon: Cpu, label: 'EMBEDDED', title: 'Think close to the machine', text: 'Work with microcontrollers, firmware, and the constraints that shape physical systems.' },
  { icon: Radio, label: 'SENSING', title: 'Give machines perception', text: 'Read the world through sensors, signals, and carefully calibrated inputs.' },
  { icon: Waypoints, label: 'AUTONOMY', title: 'Connect action to intent', text: 'Combine control, planning, and feedback to make movement purposeful.' },
];

export default function RoboticsWing() {
  return (
    <div className="dev-wing-page robotics-wing-page">
      <section className="robotics-wing-hero dev-hero section-black">
        <div className="robotics-wing-hero__top"><span>WING 04 / ROBOTICS & EMBEDDED SYSTEMS</span><span>LAB STATUS / READY</span></div>
        <div className="robotics-wing-hero__intro dev-hero-container">
          <div className="dev-hero-text">
            <span className="status-badge"><i className="pulsing-dot" /> SENSE / REASON / MOVE</span>
            <h1>IDEAS THAT<br /><span className="accent-text">MOVE IN THE WORLD.</span></h1>
            <p className="dev-lead">Explore robotics from the circuit up: embedded code, sensor feedback, mechanical systems, and autonomous behavior.</p>
            <div className="dev-hero-actions">
              <a className="magnetic-btn" href="#motion-bench">ENTER THE MOTION LAB <ArrowUpRight size={16} /></a>
              <a className="ghost-btn" href="#systems">ROBOTICS SYSTEMS</a>
            </div>
          </div>
          <div id="motion-bench" className="dev-hero-terminal"><MotionBench /></div>
        </div>
      </section>

      <section id="systems" className="robotics-wing-systems section-cream">
        <div className="robotics-wing-systems__head">
          <SectionHeading eyebrow="01 / SYSTEMS THINKING" title="HARDWARE MEETS SOFTWARE." />
          <p>Robotics is a conversation between code and the physical world. Learn to build every part of it.</p>
        </div>
        <div className="robotics-wing-systems__grid">
          {systems.map(({ icon: Icon, label, title, text }, index) => (
            <article className="robotics-wing-system" key={label}>
              <div><span>0{index + 1} / {label}</span><Icon size={18} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              </article>
            ))}
        </div>
      </section>

      <section className="robotics-wing-build section-orange">
        <div><span>02 / PROTOTYPE TOGETHER</span><h2>Make a machine.<br /><em>Make it matter.</em></h2></div>
        <p>Join hands-on builds, embedded experiments, and team challenges that turn motion into useful work.</p>
        <Link to="/about">JOIN A BUILD SESSION <ArrowUpRight size={16} /></Link>
      </section>
    </div>
  );
}