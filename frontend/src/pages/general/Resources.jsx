import React from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';

import useGsap from '../../hooks/useGsap';
import SectionHeading from '../../components/ui/SectionHeading';

export default function Resources({ data }) {
  const ref = useGsap((g, ST, root) => {
    g.fromTo(
      root.querySelectorAll('.resource-card'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.7,
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          once: true
        }
      }
    );
  }, []);

  return (
    <div
      ref={ref}
      className="listing-page section-cream"
    >
      <SectionHeading
        eyebrow="03 / RESOURCES"
        title="TOOLS FOR THE NEXT BUILD."
      />

      <div className="resource-grid">
        {data.resources.map((resource) => (
          <article
            className="resource-card"
            key={resource.id}
          >
            <div className="resource-icon">
              <FileText />
            </div>

            <small>
              {resource.category} · {resource.type}
            </small>

            <h3>{resource.title}</h3>

            <p>{resource.description}</p>

            <span>{resource.date}</span>

            <button
              type="button"
              onClick={() => resource.url && window.open(resource.url, '_blank', 'noopener,noreferrer')}
              disabled={!resource.url}
            >
              OPEN RESOURCE
              <ArrowUpRight />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
