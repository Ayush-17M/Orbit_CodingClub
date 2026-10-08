import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading';
import DevTerminal from '../../components/DSA/DevTerminal';
import StackBento from '../../components/DSA/StackBento';
import DevRoadmap from '../../components/DSA/DevRoadmap';
import ProjectShowcase from '../../components/DSA/ProjectShowcase';
import ComplexitySection from '../../components/DSA/ComplexitySection';
import PracticeWorkflow from '../../components/DSA/PracticeWorkflow';
import CommunitySection from '../../components/DSA/CommunitySection';
import ToolsStrip from '../../components/DSA/ToolsStrip';
import NodeGraph from '../../components/DSA/NodeGraph';
import useGsap from '../../hooks/useGsap';
import '../../styles/dsa-wing.css';

export default function DsaWing() {
  const ref = useGsap((g) => {
    g.from('.dev-hero-text > *', {
      y: 35,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
    });

    g.from('.stack-bento .bento-card', {
      y: 50,
      opacity: 0,
      stagger: 0.12,
      immediateRender: false,
      scrollTrigger: { trigger: '.stack-section', start: 'top 75%' },
    });

    g.from('.roadmap-stepper .stepper-item', {
      x: -24,
      opacity: 0,
      stagger: 0.12,
      scrollTrigger: { trigger: '.roadmap-section', start: 'top 70%' },
    });

    g.from('.pattern-card', {
      y: 45,
      opacity: 0,
      stagger: 0.1,
      scrollTrigger: { trigger: '.patterns-section', start: 'top 75%' },
    });

    g.from('.complexity-chip-card', {
      y: 30,
      opacity: 0,
      stagger: 0.08,
      scrollTrigger: { trigger: '.complexity-section', start: 'top 78%' },
    });

    g.from('.workflow-card', {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      scrollTrigger: { trigger: '.practice-section', start: 'top 75%' },
    });

    g.from('.community-tile', {
      y: 30,
      opacity: 0,
      stagger: 0.08,
      scrollTrigger: { trigger: '.community-section', start: 'top 78%' },
    });
  }, []);

  return (
    <div ref={ref} className="dev-wing-page">

      {/* 1. HERO SECTION */}
      <section className="dev-hero section-black">
        <div className="dev-hero-grid" />
        <NodeGraph />

        <div className="dev-hero-container">
          <div className="dev-hero-text">
            <div className="status-badge">
              <span className="pulsing-dot" />
              <span>WING 03 // DSA</span>
            </div>

            <h1>
              MASTER THE ART OF <br />
              <span className="accent-text">PROBLEM SOLVING.</span>
            </h1>

            <p className="dev-lead">
              Build strong problem-solving skills through data structures,
              algorithms, complexity analysis, and consistent competitive
              programming practice.
            </p>

            <div className="dev-hero-actions">
              <a href="#topics" className="magnetic-btn">
                EXPLORE DSA <ArrowUpRight size={16} />
              </a>
              <a href="#roadmap" className="ghost-btn">
                START LEARNING
              </a>
            </div>
          </div>

          <div className="dev-hero-terminal">
            <DevTerminal />
          </div>
        </div>
      </section>

      {/* 2. DSA CORE TOPICS */}
      <section id="topics" className="stack-section section-black">
        <SectionHeading
          dark
          eyebrow="01 / FUNDAMENTALS"
          title="THE CORE OF COMPUTATIONAL THINKING."
        />
        <p className="section-subtext">
          Explore essential data structures and algorithms that form the
          foundation of efficient and scalable systems.
        </p>
        <StackBento />
      </section>

      {/* 3. DSA ROADMAP */}
      <section id="roadmap" className="roadmap-section section-cream">
        <SectionHeading
          eyebrow="02 / ROADMAP"
          title="YOUR JOURNEY TO MASTERY."
        />
        <p className="section-subtext-dark">
          A structured path from foundations to advanced problem solving.
        </p>
        <DevRoadmap />
      </section>

      {/* 4. PATTERN RECOGNITION */}
      <section id="patterns" className="patterns-section section-black">
        <SectionHeading
          dark
          eyebrow="03 / PATTERNS"
          title="LEARN THE PATTERNS BEHIND THE PROBLEMS."
        />
        <p className="section-subtext">
          Recognize common patterns, spot repeated structures, and solve
          problems more efficiently.
        </p>
        <ProjectShowcase />
      </section>

      {/* 5. TIME & SPACE COMPLEXITY */}
      <section id="complexity" className="complexity-section section-black">
        <SectionHeading
          dark
          eyebrow="04 / COMPLEXITY"
          title="THINK IN TIME & SPACE."
        />
        <p className="section-subtext">
          We don't just aim for correctness — we understand the "why"
          behind every solution.
        </p>
        <ComplexitySection />
      </section>

      {/* 6. PRACTICE WORKFLOW */}
      <section id="practice" className="practice-section section-cream">
        <SectionHeading
          eyebrow="05 / PRACTICE"
          title="FROM PROBLEM TO SOLUTION TO OPTIMIZATION."
        />
        <p className="section-subtext-dark">
          Every problem you solve here follows the same disciplined loop —
          on purpose.
        </p>
        <PracticeWorkflow />
      </section>

      {/* 7. COMMUNITY */}
      <section id="community" className="community-section section-black">
        <SectionHeading
          dark
          eyebrow="06 / COMMUNITY"
          title="CODE TOGETHER, GROW TOGETHER."
        />
        <p className="section-subtext">
          Collaborate with fellow members, share approaches, and learn from
          every submission — not just your own.
        </p>
        <CommunitySection />
      </section>

      {/* 8. TOOLS / PLATFORMS */}
      <section id="tools" className="tools-section section-black">
        <SectionHeading dark eyebrow="07 / PRACTICE GROUNDS" title="BUILT THROUGH ALGORITHMS." />
        <ToolsStrip />
      </section>

    </div>
  );
}
