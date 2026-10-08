import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/student-auth.css';

const SESSION_KEY = 'orbit-student-session';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) {
      navigate('/student/login', { replace: true });
      return;
    }

    try {
      setUser(JSON.parse(stored));
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
      navigate('/student/login', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    navigate('/student/login', { replace: true });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="student-dashboard">
      <div className="student-dashboard-card">
        <div className="student-dashboard-header">
          <h1>
            Welcome back, <span>{user.name.split(' ')[0]}</span>
          </h1>
          <button className="student-dashboard-logout" onClick={handleLogout}>Logout</button>
        </div>

        <p className="student-dashboard-meta">
          You are signed in as <strong>{user.email}</strong> from <strong>{user.college}</strong>.
        </p>

        <div className="student-dashboard-grid">
          <div className="student-stat">
            <small>Projects</small>
            <strong>08</strong>
          </div>
          <div className="student-stat">
            <small>Workshops</small>
            <strong>05</strong>
          </div>
          <div className="student-stat">
            <small>XP</small>
            <strong>1.2k</strong>
          </div>
        </div>

        <div className="student-dashboard-actions">
          <Link className="student-action" to="/">Return Home</Link>
          <Link className="student-action student-secondary" to="/resources">Browse Resources</Link>
        </div>
      </div>
    </div>
  );
}
