import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Brain,
  Code2,
  Binary,
  Bot,
  PenTool,
} from "lucide-react";

const icons = {
  Brain,
  Code2,
  Binary,
  Bot,
  PenTool,
};

export default function Navbar({ wings }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-wrap">
      <nav className="nav">
        <Link
          className="brand orbit-brand"
          to="/"
          onClick={() => setOpen(false)}
          aria-label="Orbit home"
        >
          <img src="/orbitlogo.png" alt="Orbit" />
          <span className="orbit-brand-name">ORBIT</span>
        </Link>

        <div className="desktop-nav">
          <NavLink to="/">Home</NavLink>

          <Link className="nav-link" to="/wings" onClick={() => setOpen(false)}>
            Wings
          </Link>

          <NavLink to="/resources">Resources</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </div>

        <button
          className="mobile-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>

          <Link to="/wings" onClick={() => setOpen(false)}>
            Wings
          </Link>

          <NavLink to="/resources" onClick={() => setOpen(false)}>
            Resources
          </NavLink>

          <NavLink to="/gallery" onClick={() => setOpen(false)}>
            Gallery
          </NavLink>

          <NavLink to="/about" onClick={() => setOpen(false)}>
            About
          </NavLink>

          <NavLink to="/login" onClick={() => setOpen(false)}>
            Login
          </NavLink>
        </div>
      )}
    </header>
  );
}
