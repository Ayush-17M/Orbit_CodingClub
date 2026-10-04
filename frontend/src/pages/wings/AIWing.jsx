import React from 'react';
import { ArrowUpRight, Braces, Database, ScanEye } from 'lucide-react';
import { Link } from 'react-router-dom';
import ModelLab from '../../components/AiMl/AiMlEcosystem';
import SectionHeading from '../../components/ui/SectionHeading';
import '../../styles/dsa-wing.css';
import '../../styles/aiml-wing.css';

const tracks = [
  { number: '01', icon: Database, title: 'Python & math foundations', text: 'Build fluency with Python, linear algebra, statistics, and practical data preparation.' },
  { number: '02', icon: Braces, title: 'Classical machine learning', text: 'Explore regression, classification, clustering, and ways to evaluate model quality.' },
  { number: '03', icon: ScanEye, title: 'Deep learning & perception', text: 'Study neural networks, language models, computer vision, and responsible experimentation.' },
  { number: '04', icon: ArrowUpRight, title: 'Deployment & applied AI', text: 'Connect models to real workflows through APIs, MLOps, and thoughtful product interfaces.' },
];

const projects = [
  { number: '01', title: 'Sentiment analyzer', text: 'Classify review tone and inspect the language signals behind each prediction.', type: 'NLP / CLASSIFICATION' },
  { number: '02', title: 'Visual defect detector', text: 'Explore image classification for finding patterns in product and inspection imagery.', type: 'VISION / CNN' },
];

const stack = ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Hugging Face', 'OpenCV'];

export default function AIWing() {
  return (
    <div className="dev-wing-page ai-wing-page">
      <section className="ai-wing-hero dev-hero section-black">
        <div className="ai-wing-hero__grid" />
        <div className="ai-wing-hero__content dev-hero-container">
          <div className="ai-wing-hero__copy dev-hero-text">
            <span className="ai-wing-kicker status-badge"><i className="pulsing-dot" /> WING 01 / AI & MACHINE LEARNING</span>
            <h1>MAKE DATA<br /><span className="accent-text">THINK CLEARLY.</span></h1>
            <p className="dev-lead">Explore models, understand their limits, and turn machine intelligence into useful tools people can trust.</p>
            <div className="ai-wing-hero__actions dev-hero-actions">
              <a className="magnetic-btn" href="#model-lab">OPEN THE MODEL LAB <ArrowUpRight size={16} /></a>
              <a className="ghost-btn" href="#roadmap">LEARNING PATH</a>
            </div>
            <div className="ai-wing-hero__metrics">
              {['DATA FIRST', 'TEST THE MODEL', 'SHIP WITH CARE'].map((label, index) => (
                <div key={label}><strong>0{index + 1}</strong><span>{label}</span></div>
              ))}
            </div>
          </div>
          <div id="model-lab" className="ai-wing-hero__lab dev-hero-terminal"><ModelLab /></div>
        </div>
      </section>

      <section id="roadmap" className="ai-wing-tracks section-cream">
        <div className="ai-wing-section-head">
          <SectionHeading eyebrow="01 / LEARNING PATH" title="FROM RAW DATA TO REAL-WORLD AI." />
          <p>Build understanding in layers, from mathematical foundations to models running in real applications.</p>
        </div>
        <div className="ai-wing-track-grid">
          {tracks.map(({ number, icon: Icon, title, text }) => (
            <article className="ai-wing-track" key={number}>
              <div className="ai-wing-track__top"><span>{number}</span><Icon size={19} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="ai-wing-track__line" />
            </article>
          ))}
        </div>
        <div className="ai-wing-stack tools-strip" aria-label="AI and machine learning tools">
          <span>TOOLS IN THE LAB</span>
          {stack.map((tool) => <span className="tool-tile" key={tool}>{tool}</span>)}
        </div>
      </section>

      <section className="ai-wing-projects section-black">
        <div className="ai-wing-section-head">
          <SectionHeading dark eyebrow="02 / PROJECT IDEAS" title="LEARN BY MAKING SOMETHING USEFUL." />
          <p>Start with a real question, build a small experiment, and make the result understandable.</p>
        </div>
        <div className="ai-wing-project-grid">
          {projects.map((project) => (
            <article className="ai-wing-project pattern-card" key={project.number}>
              <span>{project.number} / {project.type}</span>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              <ArrowUpRight size={18} />
            </article>
          ))}
        </div>
      </section>

      <section className="ai-wing-build section-orange">
        <div><span className="ai-wing-kicker">03 / BUILD TO UNDERSTAND</span><h2>Curiosity is a good starting point.<br /><em>A working prototype is better.</em></h2></div>
        <p>Join model experiments, data challenges, and small product teams. Learn to ask sharper questions before reaching for a larger model.</p>
        <Link to="/about">MEET THE COMMUNITY <ArrowUpRight size={16} /></Link>
      </section>
    </div>
  );
}