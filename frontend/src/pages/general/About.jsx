import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight
} from 'lucide-react';

import SectionHeading from '../../components/ui/SectionHeading';
import useGsap from '../../hooks/useGsap';

export default function About({ data }) {
  const ref = useGsap((g, ST, root) => {
    g.from('.stat', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.stats',
        start: 'top 80%'
      }
    });

    g.from('.contact-block', {
      x: -30,
      opacity: 0,
      stagger: 0.12,
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 75%'
      }
    });
  }, []);

  return (
    <div ref={ref} className="about-page">

      {/* ABOUT INTRO */}
      <section className="about-intro section-cream">
        <SectionHeading
          eyebrow="05 / ABOUT"
          title="A COMMUNITY FOR CURIOUS BUILDERS."
        />

        <div className="about-columns">
          <p className="about-lead">
            {data.about.text}
          </p>

          <div>
            <h3>MISSION</h3>
            <p>{data.about.mission}</p>

            <h3>VISION</h3>
            <p>{data.about.vision}</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats section-black">
        <div className="stats-grid">
          {data.about.stats.map((stat) => (
            <div
              className="stat"
              key={stat.label}
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section section-black">
        <SectionHeading
          dark
          eyebrow="06 / CONTACT"
          title="CONTACT DETAILS"
        />

        <div className="contact-grid">

          {/* CONTACT INFORMATION */}
          <div className="contact-info">

            <div className="contact-block">
              <MapPin />

              <div>
                <b>ADDRESS</b>

                <p>
                  {data.contact.address}
                </p>
              </div>
            </div>

            <div className="contact-block">
              <Phone />

              <div>
                <b>PHONE</b>

                <p>
                  {data.contact.phone ||
                    'Call details are configurable in Admin.'}
                </p>

                {data.contact.phone && (
                  <a
                    href={`tel:${data.contact.phone}`}
                  >
                    CALL NOW
                    <ArrowUpRight />
                  </a>
                )}
              </div>
            </div>

            <div className="contact-block">
              <Mail />

              <div>
                <b>EMAIL</b>

                <p>
                  {data.contact.email}
                </p>

                <a
                  href={`mailto:${data.contact.email}`}
                >
                  EMAIL NOW
                  <ArrowUpRight />
                </a>
              </div>
            </div>

          </div>

          {/* MAP */}
          <div className="map-box">

            {data.contact.mapUrl ? (
              <iframe
                title="Organization location"
                src={data.contact.mapUrl}
                width="100%"
                height="400"
                className="map-frame"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="map-placeholder">
                <span>
                  MAP / CONFIGURABLE
                </span>

                <strong>
                  Siwan, Bihar
                </strong>

                <p>
                  Add a Google Maps/embed URL
                  from Admin.
                </p>
              </div>
            )}

            <a
              className="map-button"
              href={data.contact.mapLink || '#'}
              target={
                data.contact.mapLink
                  ? '_blank'
                  : undefined
              }
              rel="noreferrer"
              onClick={(e) => {
                if (!data.contact.mapLink) {
                  e.preventDefault();
                }
              }}
            >
              OPEN IN MAPS
              <ArrowUpRight />
            </a>

          </div>

        </div>
      </section>

    </div>
  );
}