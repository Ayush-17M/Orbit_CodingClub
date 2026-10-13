import React, { useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';

import useGsap from '../../hooks/useGsap';
import SectionHeading from '../../components/ui/SectionHeading';
import { resolveAssetUrl } from '../../utils/api';

export default function Gallery({ data }) {
  const [filter, setFilter] = useState('ALL');
  const [active, setActive] = useState(null);

  const cats = [
    'ALL',
    'EVENTS',
    'WORKSHOPS',
    'PROJECTS',
    'TEAM',
    'DESIGN'
  ];

  const items = data.gallery.filter(
    (item) =>
      filter === 'ALL' || item.category === filter
  );
  const activeWing = active?.category === 'EVENTS'
    ? data.wings.find((wing) => wing.id === active.wingId)
    : null;

  const ref = useGsap(
    (g, ST, root) => {
      g.from('.gallery-item', {
        y: 50,
        opacity: 0,
        scale: 0.98,
        stagger: 0.06,
        duration: 0.65,
        scrollTrigger: {
          trigger: root,
          start: 'top 78%'
        }
      });
    },
    [filter]
  );

  return (
    <div
      ref={ref}
      className="listing-page section-cream"
    >
      <SectionHeading
        eyebrow="04 / GALLERY"
        title="MOMENTS OF MAKING."
      />

      {/* Filters */}
      <div className="filters">
        {cats.map((category) => (
          <button
            key={category}
            className={
              filter === category ? 'active' : ''
            }
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {items.map((item, index) => (
          <button
            key={item.id}
            className={`gallery-item gi-${index % 4}`}
            onClick={() => setActive(item)}
          >
            {item.image ? (
              <img
                src={resolveAssetUrl(item.image)}
                alt={item.title}
              />
            ) : (
              <div className="gallery-placeholder">
                <span>{item.category}</span>

                <strong>{item.title}</strong>

                <ArrowUpRight />
              </div>
            )}

            <div className="gallery-caption">
              <span>{item.category}</span>
              <b>{item.title}</b>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="lightbox"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            <X />
          </button>

          {active.image && (
            <img
              src={resolveAssetUrl(active.image)}
              alt={active.title}
            />
          )}

          <div>
            <small>{active.category}</small>

            <h2>{active.title}</h2>

            {active.date && <p>{active.date}</p>}
            <p>{active.description}</p>
            {active.category === 'EVENTS' && (
              <p>
                {activeWing?.name || 'Orbit event'}
                {activeWing?.coordinator ? ` · Coordinator: ${activeWing.coordinator}` : ''}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}