import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getWingPath } from '../../data/siteData';

export default function Footer({ data }) {
  return (
    <footer className="site-footer">
      <div className="footer-statement">
        <span>BUILD WHAT&apos;S NEXT</span>
        <ArrowUpRight aria-hidden="true" />
      </div>

      <div className="footer-grid">
        <div className="footer-intro">
          <Link to="/" className="footer-orbit-brand" aria-label="Orbit home">
            <img src="/orbitlogo.png" alt="Orbit" />
            <span>ORBIT</span>
          </Link>
          <p>Technical curiosity.<br />Creative execution.</p>
        </div>

        <div className="footer-links">
          <b>NAVIGATION</b>
          <Link to="/">Home</Link>
          <Link to="/wings">Wings</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/about">About</Link>
        </div>

        <div className="footer-links">
          <b>WINGS</b>
          {data.wings.map((wing) => (
            <Link key={wing.id} to={getWingPath(wing.id)}>{wing.name}</Link>
          ))}
        </div>

        <div className="footer-links footer-contact">
          <b>CONTACT</b>
          <span>{data.contact.email}</span>
          <span>{data.contact.phone || 'Phone — configurable'}</span>
          {data.contact.LinkedIn && (
            <a href={data.contact.LinkedIn} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={14} />
            </a>
          )}
          {data.social.linkedin && <a href={data.social.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a>}
          {data.social.github && <a href={data.social.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>}

        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} ORBIT</span>
        <span>Frontend-only community platform</span>
      </div>
    </footer>
  );
}
