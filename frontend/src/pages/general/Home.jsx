import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import useGsap from '../../hooks/useGsap';
import SectionHeading from '../../components/ui/SectionHeading';
import MagneticButton from '../../components/ui/MagneticButton';
import CodingVisual from '../../components/ui/CodingVisual';
import {
  pageEnter,
  parallax,
  revealUp,
  scrollReveal
} from '../../animations';
import { getWingPath } from '../../data/siteData';

export default function Home({ data }) {
  const ref = useGsap((g, ST, root) => {
    pageEnter(root);
    revealUp(root.querySelectorAll('.hero-copy>*'), {
      y: 40,
      duration: 1,
      stagger: 0.12
    });

    // Scroll reveal animations
    g.utils.toArray('.reveal').forEach((el) => {
      scrollReveal(el, { y: 70, blur: 8, duration: 1 });
    });

    // Hero background parallax
    parallax(root.querySelector('.hero-grid'), {
      yPercent: -18,
      trigger: root.querySelector('.hero'),
      start: 'top top',
      end: 'bottom top'
    });
  }, []);

  return (
    <div ref={ref}>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-grid" />

        <CodingVisual />

        <div className="hero-copy">
          <p className="eyebrow">
            TECHNICAL / CREATIVE ORGANIZATION
          </p>

          <h1>
            {data.hero.title.split(' ').map((word, index) => (
              <span key={index}>
                {word}{' '}
              </span>
            ))}
          </h1>

          <p className="hero-desc">
            {data.hero.description}
          </p>

          <MagneticButton
            onClick={() =>
              document
                .querySelector('#home-wings')
                ?.scrollIntoView({
                  behavior: 'smooth'
                })
            }
          >
            {data.hero.cta}
            <ArrowUpRight size={17} />
          </MagneticButton>
        </div>

        <div className="hero-meta">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDownRight />
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="intro section-cream">
        <SectionHeading
          eyebrow="01 / INTRO"
          title={data.intro.title}
        />

        <p className="intro-copy reveal">
          {data.intro.description}
        </p>
      </section>

      {/* WINGS SECTION */}
      <section
        id="home-wings"
        className="home-wings section-black"
      >
        <SectionHeading
          dark
          eyebrow="02 / WINGS"
          title="FIVE DIRECTIONS. ONE COMMUNITY."
        />

        <div className="mini-wings">
          {data.wings.map((wing) => (
            <Link
              className="mini-wing reveal"
              to={getWingPath(wing.id)}
              key={wing.id}
            >
              <span>{wing.number}</span>

              <h3>{wing.name}</h3>

              <p>{wing.description}</p>

              <ArrowUpRight />
            </Link>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section section-orange">
        <div className="cta-big reveal">
          LEARN.
          <br />
          BUILD.
          <br />
          SHIP.
        </div>

        <Link
          className="circle-link"
          to="/about"
        >
          ABOUT US
          <ArrowUpRight />
        </Link>
      </section>
    </div>
  );
}
