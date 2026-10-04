import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading';
import DevTerminal from '../../components/dev/DevTerminal';
import StackBento from '../../components/dev/StackBento';
import DevRoadmap from '../../components/dev/DevRoadmap';
import ProjectShowcase from '../../components/dev/ProjectShowcase';
import useGsap from '../../hooks/useGsap';
import { wingCatalog } from '../../data/wings';

export default function WingPage() {
  const { slug } = useParams();
  const wing = wingCatalog[slug] || wingCatalog.dev;

  const ref = useGsap((g) => {
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
  }, [slug]);

  return (
    <div ref={ref} className="dev-wing-page">
      <section className="dev-hero section-black">
        <div className="dev-hero-grid" />
        <div className="dev-hero-container">
          <div className="dev-hero-text">
            <div className="status-badge">
              <span className="pulsing-dot" />
              <span>{wing.badge}</span>
            </div>

            <h1>
              {wing.title.map((line, index) => (
                <React.Fragment key={index}>
                  {index === 0 ? line : <span className="accent-text">{line}</span>}
                  {index < wing.title.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>

            <p className="dev-lead">{wing.lead}</p>

            <div className="dev-hero-actions">
              {wing.primaryAction && (
                <a href={wing.primaryAction.href} className="magnetic-btn">
                  {wing.primaryAction.label} <ArrowUpRight size={16} />
                </a>
              )}

              {wing.secondaryAction && (
                <a href={wing.secondaryAction.href} className="ghost-btn">
                  {wing.secondaryAction.label}
                </a>
              )}
            </div>
          </div>

          <div className="dev-hero-terminal">{wing.terminal}</div>
        </div>
      </section>

      {wing.stack && (
        <section className="stack-section section-black">
          <SectionHeading
            dark={wing.stack.dark}
            eyebrow={wing.stack.eyebrow}
            title={wing.stack.title}
          />
          <p className="section-subtext">{wing.stack.subtitle}</p>
          {wing.stack.component}
        </section>
      )}

      {wing.roadmap && (
        <section id="roadmap" className="roadmap-section section-cream">
          <SectionHeading
            dark={wing.roadmap.dark}
            eyebrow={wing.roadmap.eyebrow}
            title={wing.roadmap.title}
          />
          <p className="section-subtext-dark">{wing.roadmap.subtitle}</p>
          {wing.roadmap.component}
        </section>
      )}

      {wing.projects && (
        <section id="projects" className="projects-section section-black">
          <SectionHeading
            dark={wing.projects.dark}
            eyebrow={wing.projects.eyebrow}
            title={wing.projects.title}
          />
          {wing.projects.component}
        </section>
      )}

      {wing.cta && (
        <section className="dev-cta-section section-orange">
          <div className="dev-cta-content">
            <div className="eyebrow">{wing.cta.eyebrow}</div>
            <h2>{wing.cta.title}</h2>
            <p>{wing.cta.text}</p>
            <Link to={wing.cta.to || '/about'} className="circle-link">
              {wing.cta.buttonLabel || 'JOIN US'} <ArrowUpRight />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}