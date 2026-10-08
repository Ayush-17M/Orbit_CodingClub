import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginChoice() {
  return (
    <div className="login-choice-shell">
      <div className="login-choice-card">
        <div className="login-choice-header">
          <span className="student-overline">Welcome to Orbit</span>
          <h1 className="student-brand">
            Choose your <span>login</span>
          </h1>
        </div>

        <div className="login-choice-grid">
          <Link to="/student/login" className="login-choice-option student-option">
            <span className="login-choice-label">Student</span>
            <strong>Student Login</strong>
            <small>Access resources, workshops, and club updates.</small>
          </Link>

          <Link to="/admin/login" className="login-choice-option admin-option">
            <span className="login-choice-label">Admin</span>
            <strong>Admin Login</strong>
            <small>Manage content, announcements, and site updates.</small>
          </Link>
        </div>
      </div>
    </div>
  );
}
