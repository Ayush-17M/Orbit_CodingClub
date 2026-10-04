import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Brain,
  Code2,
  Binary,
  Bot,
  PenTool,
  ArrowUpRight
} from 'lucide-react';

import SectionHeading from '../../components/ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const icons = {
  Brain,
  Code2,
  Binary,
  Bot,
  PenTool,
};
import { getWingPath } from '../../data/siteData';

export default function Wings({ data }) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(min-width:900px)").matches) {
        const track = document.querySelector(".wings-track");

        if (track) {
          gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
              trigger: '.wings-pin',
              pin: true,
              scrub: 1,
              end: () =>
                '+=' +
                (track.scrollWidth - window.innerWidth)
            }
          });
        }
      }

      gsap.from('.wing-card', {
        y: 60,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.wings-page',
          start: 'top 70%'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="wings-page">
      {/* Page Hero */}
      <section className="page-hero section-black">
        <SectionHeading
          dark
          eyebrow="WINGS / 02"
          title="EXPLORE YOUR DIRECTION."
        />

        <p>Five focused tracks for people who want to learn by making.</p>
      </section>

      {/* Wings */}
      <section className="wings-pin">
        <div className="wings-track">
          {data.wings.map((wing) => {
            const Icon = icons[wing.icon] || Code2;

            return (
              <article id={wing.id} className="wing-card" key={wing.id}>
                <div className="wing-card-top">
                  <span>{wing.number}</span>
                  <Icon />
                </div>

                <div>
                  <small>{wing.accent}</small>

                  <h2>{wing.name}</h2>

                  <p>{wing.description}</p>

                  <Link
                    data-cursor="EXPLORE"
                    to={getWingPath(wing.id)}
                  >
                    EXPLORE WING
                    <ArrowUpRight />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}