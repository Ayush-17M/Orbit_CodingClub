import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Linkedin } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading';
import DevTerminal from '../../components/dev/DevTerminal';
import StackBento from '../../components/dev/StackBento';
import useGsap from '../../hooks/useGsap';

export default function DevelopmentWing() {
  const [activeLayer, setActiveLayer] = useState('frontend');

  const teamMembers = [
    {
      name: 'Raushan Kumar Singh',
      role: 'Full Stack Developer',
      bio: 'CS undergrad and Coding Club Coordinator passionate about DSA, Java, and full-stack development, helping students learn, build, and grow together.',
      image: '/myphoto.jpeg',
      linkedin: 'https://www.linkedin.com/in/raushan-kumar-singh-24a04b33b',
      github: 'https://github.com/raushandeveloper?tab=repositories'
    },
    {
      name: 'Priyanshu',
      role: 'Backend Developer',
      bio: 'Works on APIs, authentication, and robust application architecture for scalable products.',
      image: '/pri.png',
      linkedin: 'https://www.linkedin.com/in/priyanshu-a95522328/',
      github: 'https://github.com/codegritpriyanshu'
    },
    {
      name: 'Dipanshu Singh',
      role: 'Full Stack Mentor',
      bio: 'Helps the community turn ideas into real projects through structured learning and code reviews.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
      linkedin: 'https://www.linkedin.com/in/dipanshu-singh-0924a023b',
      github: 'https://github.com/dipanshusingh'
    }
  ];

  const webLayers = [
    {
      id: 'frontend',
      title: 'Frontend',
      short: 'UI + User Experience',
      description: 'Build polished, responsive interfaces with React, modern CSS, accessibility, and smooth user interactions.',
      points: ['Component-driven architecture', 'Responsive layouts', 'Performance-driven UI decisions']
    },
    {
      id: 'backend',
      title: 'Backend',
      short: 'APIs + Logic',
      description: 'Design clean server logic, REST APIs, auth flows, and scalable services that support product features.',
      points: ['RESTful API design', 'Authentication and security', 'Business logic and data processing']
    },
    {
      id: 'database',
      title: 'Database',
      short: 'Storage + Data Flow',
      description: 'Structure data effectively, optimize queries, and keep information consistent across the whole application.',
      points: ['Schema design', 'Query optimization', 'Data consistency and relationships']
    }
  ];

  const webTracks = [
    {
      phase: 'PHASE 01',
      status: 'completed',
      title: 'Core DOM & Modern JS',
      desc: 'Async workflows, Event Loop, Closures, DOM manipulation & ESNext patterns.'
    },
    {
      phase: 'PHASE 02',
      status: 'in progress',
      title: 'React 19 & Component Architecture',
      desc: 'Custom hooks, Server/Client components, State machines, and Suspense patterns.'
    },
    {
      phase: 'PHASE 03',
      status: 'upcoming',
      title: 'Creative Web & Motion Graphics',
      desc: 'GSAP ScrollTrigger, Lenis smooth scroll, Three.js / WebGL shader pipelines.'
    },
    {
      phase: 'PHASE 04',
      status: 'upcoming',
      title: 'Production Build & Optimization',
      desc: 'Bundle analysis, Code splitting, Web Vitals, and Lighthouse audit performance.'
    }
  ];

  const appTracks = [
    {
      phase: 'PHASE 01',
      status: 'completed',
      title: 'App UI Foundations',
      desc: 'Responsive mobile layouts, design systems, and navigation patterns for app experiences.'
    },
    {
      phase: 'PHASE 02',
      status: 'in progress',
      title: 'App APIs & Authentication',
      desc: 'REST APIs, token-based auth, role handling, and secure data exchange between app and backend.'
    },
    {
      phase: 'PHASE 03',
      status: 'upcoming',
      title: 'React Native / Cross-Platform Builds',
      desc: 'Component reuse, state management, device APIs, and app-specific performance tuning.'
    },
    {
      phase: 'PHASE 04',
      status: 'upcoming',
      title: 'Launch, Analytics & Deployment',
      desc: 'App stores, CI/CD, crash monitoring, analytics, and performance tracking after release.'
    }
  ];

  const selectedLayer = webLayers.find((layer) => layer.id === activeLayer) || webLayers[0];

  const ref = useGsap((g, ST, root) => {
    g.from('.dev-hero-text > *', {
      y: 35,
      opacity: 0, 
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out'
    });

    g.from('.bento-card', {
      y: 50,
      opacity: 0,
      stagger: 0.12,
      scrollTrigger: {
        trigger: '.stack-section',
        start: 'top 75%'
      }
    });

    g.from('.dev-project-card', {
      y: 45,
      opacity: 0,
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.projects-section',
        start: 'top 75%'
      }
    });
  }, []);

  return (
    <div ref={ref} className="dev-wing-page">
      {/* 1. HERO SECTION */}
      <section className="dev-hero section-black">
        <div className="dev-hero-grid" />
        <div className="dev-hero-container">
          <div className="dev-hero-text">
            <div className="status-badge">
              <span className="pulsing-dot" />
              <span>WING 02 // DEV_CORE</span>
            </div>
            <h1>
              CRAFTING <br />
              <span className="accent-text">MODERN SYSTEMS.</span>
            </h1>
            <p className="dev-lead">
              We design, build, and deploy production-grade web platforms, scalable backend services, and interactive digital experiences.
            </p>
            <div className="dev-hero-actions">
              <a href="#projects" className="magnetic-btn">
                EXPLORE BUILDS <ArrowUpRight size={16} />
              </a>
              <a href="#roadmap" className="ghost-btn">
                LEARNING TRACKS
              </a>
            </div>
          </div>
          <div className="dev-hero-terminal">
            <DevTerminal />
          </div>
        </div>
      </section>

      {/* 2. ROADMAP & CURRICULUM */}

      {/* 4. TEAM MEMBERS */}
      <section className="team-section section-black">
        <SectionHeading compact dark eyebrow="04 / TEAM" title="MEET THE CORE CREW." />

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.name} className="team-card">
              <div className="team-avatar-wrap">
                <div className="team-avatar">
                  <img src={member.image} alt={member.name} />
                </div>
              </div>

              <div className="team-card__body">
                <p className="team-role">{member.role}</p>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-bio">{member.bio}</p>

                <div className="team-links">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} LinkedIn`} className="team-link">
                      <Linkedin size={16} />
                    </a>
                  )}

                  {member.github && (
                    <a href={member.github} target="_blank" rel="noreferrer" aria-label={`${member.name} GitHub`} className="team-link">
                      <Github size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. TECH STACK BENTO */}
      <section className="stack-section section-black">
        <SectionHeading dark eyebrow="01 / ECOSYSTEM" title="PRODUCTION TECH STACK." />
        <p className="section-subtext">
          Modern frameworks and infrastructure we build with on a daily basis.
        </p>
        <StackBento />
      </section>

      {/* 5. ROADMAP & CURRICULUM */}
      <section id="roadmap" className="roadmap-section section-cream">
        <SectionHeading eyebrow="02 / CURRICULUM" title="STRUCTURED LEARNING TRACKS." />
        <p className="section-subtext-dark">
          From fundamental JavaScript and architecture to full-stack microservices and deployment.
        </p>

        <div className="roadmap-two-column">
          <div className="roadmap-panel">
            <p className="panel-label">Web Development</p>
            <h3 className="panel-title">Frontend Track</h3>

            <div className="panel-list">
              {webTracks.map((track) => (
                <div key={track.title} className="track-card">
                  <div className="track-card__meta">
                    <span className="track-card__phase">{track.phase}</span>
                    <span className="track-card__status">{track.status}</span>
                  </div>
                  <h4 className="track-card__title">{track.title}</h4>
                  <p className="track-card__desc">{track.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="roadmap-panel">
            <p className="panel-label">App Development</p>
            <h3 className="panel-title">Full-Stack Track</h3>

            <div className="panel-list">
              {appTracks.map((track) => (
                <div key={track.title} className="track-card">
                  <div className="track-card__meta">
                    <span className="track-card__phase">{track.phase}</span>
                    <span className="track-card__status">{track.status}</span>
                  </div>
                  <h4 className="track-card__title">{track.title}</h4>
                  <p className="track-card__desc">{track.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. WEB DEV & APP DEV */}
      <section className="dev-build-section section-black">
        <SectionHeading dark eyebrow="05 / LEARN BY BUILDING" title="WEB DEV & APP DEVELOPMENT." />

        <div className="dev-build-layout">
          <div className="dev-panel dev-panel--primary">
            <p className="dev-panel__label">Web Development</p>

            <div className="dev-layer-tabs">
              {webLayers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={activeLayer === layer.id ? 'dev-layer-tab is-active' : 'dev-layer-tab'}
                >
                  {layer.title}
                </button>
              ))}
            </div>

            <div className="dev-layer-card">
              <p className="dev-layer-card__label">{selectedLayer.short}</p>
              <h3>{selectedLayer.title}</h3>
              <p className="dev-layer-card__desc">{selectedLayer.description}</p>

              <ul className="dev-layer-points">
                {selectedLayer.points.map((point) => (
                  <li key={point} className="dev-layer-point">
                    <span className="dev-layer-point__bullet" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="dev-panel dev-panel--secondary">
            <p className="dev-panel__label">App Development</p>

            <div className="dev-app-list">
              <div className="dev-app-card">
                <h4>Mobile-first UX</h4>
                <p>Design for smaller screens, fast flows, and better user retention.</p>
              </div>

              <div className="dev-app-card">
                <h4>API integrations</h4>
                <p>Connect apps with auth, payments, cloud services, and live data layers.</p>
              </div>

              <div className="dev-app-card">
                <h4>Deployment & scaling</h4>
                <p>Ship faster with clean build pipelines, monitoring, and performance checks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FLAGSHIP BUILDS */}
      <section id="projects" className="projects-section section-black">
        <SectionHeading dark eyebrow="03 / BUILDS" title="SHIPPED PROJECTS & OPEN SOURCE." />
      </section>
    </div>
  );
}