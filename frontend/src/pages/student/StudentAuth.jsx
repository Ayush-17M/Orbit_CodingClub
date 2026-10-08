import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/student-auth.css';

const STORAGE_KEY = 'orbit-student-users';
const SESSION_KEY = 'orbit-student-session';

function getStoredUsers() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) {
      const demoUser = {
        id: 'demo-student',
        name: 'Demo Student',
        email: 'student@orbit.com',
        college: 'Orbit Campus',
        password: 'orbit123',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([demoUser]));
      return [demoUser];
    }
    return JSON.parse(value);
  } catch {
    return [];
  }
}

export default function StudentAuth({ mode = 'login' }) {
  const isLogin = mode === 'login';
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    college: '',
    password: '',
    confirmPassword: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const updateLoginForm = (event) => {
    const { name, value } = event.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateRegisterForm = (event) => {
    const { name, value } = event.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    const users = getStoredUsers();
    const match = users.find(
      (user) =>
        user.email.trim().toLowerCase() === loginForm.email.trim().toLowerCase() &&
        user.password === loginForm.password
    );

    if (!match) {
      setStatus({
        type: 'error',
        message: 'Invalid email or password. Try the demo account or create a new one.',
      });
      return;
    }

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(match));
    setStatus({ type: 'success', message: 'Login successful. Redirecting...' });
    setTimeout(() => navigate('/student/dashboard'), 600);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    const users = getStoredUsers();
    const name = registerForm.name.trim();
    const email = registerForm.email.trim();
    const college = registerForm.college.trim();

    if (!name || !email || !college || !registerForm.password || !registerForm.confirmPassword) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    if (registerForm.password.length < 6) {
      setStatus({ type: 'error', message: 'Password should be at least 6 characters long.' });
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    const existing = users.some(
      (user) => user.email.trim().toLowerCase() === email.toLowerCase()
    );

    if (existing) {
      setStatus({ type: 'error', message: 'An account with this email already exists.' });
      return;
    }

    const nextUser = {
      id: crypto.randomUUID ? crypto.randomUUID() : `student-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      college,
      password: registerForm.password,
    };

    const updatedUsers = [...users, nextUser];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));

    setStatus({ type: 'success', message: 'Account created successfully. Redirecting...' });
    setTimeout(() => navigate('/student/dashboard'), 700);
  };

  return (
    <div className="student-auth-shell">
      <div className="student-auth-card">
        <div className="student-auth-visual">
          <span className="student-overline">Orbit Student Community</span>
          <h1 className="student-brand">
            Join the <span>next</span> wave.
          </h1>
          <p className="student-auth-copy">
            Build projects, learn together, and unlock exclusive resources from the Orbit Club.
          </p>

          <ul className="student-feature-list">
            <li><span>1</span> Access club workshops and resources</li>
            <li><span>2</span> Track your learning progress</li>
            <li><span>3</span> Collaborate with other creators</li>
          </ul>
        </div>

        <div className="student-auth-panel">
          <div className="student-auth-tabs">
            <Link to="/student/login" className={`student-auth-tab ${isLogin ? 'active' : ''}`}>
              Login
            </Link>
            <Link to="/student/register" className={`student-auth-tab ${!isLogin ? 'active' : ''}`}>
              Register
            </Link>
          </div>

          {isLogin ? (
            <form className="student-auth-form" onSubmit={handleLogin}>
              <div className="student-field-group">
                <label htmlFor="student-login-email">Email</label>
                <input
                  id="student-login-email"
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={updateLoginForm}
                  placeholder="student@orbit.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="student-field-group">
                <label htmlFor="student-login-password">Password</label>
                <input
                  id="student-login-password"
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={updateLoginForm}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </div>

              <button className="student-auth-submit" type="submit">Login</button>
              <div className={`student-auth-status ${status.type}`}>
                {status.message}
              </div>

              <div className="student-auth-footer">
                New here? <Link to="/student/register">Create an account</Link>
              </div>
            </form>
          ) : (
            <form className="student-auth-form" onSubmit={handleRegister}>
              <div className="student-field-group">
                <label htmlFor="student-name">Full Name</label>
                <input
                  id="student-name"
                  type="text"
                  name="name"
                  value={registerForm.name}
                  onChange={updateRegisterForm}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="student-field-group">
                <label htmlFor="student-email">Email</label>
                <input
                  id="student-email"
                  type="email"
                  name="email"
                  value={registerForm.email}
                  onChange={updateRegisterForm}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="student-field-group">
                <label htmlFor="student-college">College / Institution</label>
                <input
                  id="student-college"
                  type="text"
                  name="college"
                  value={registerForm.college}
                  onChange={updateRegisterForm}
                  placeholder="College / Institute"
                  required
                />
              </div>

              <div className="student-field-group">
                <label htmlFor="student-password">Password</label>
                <input
                  id="student-password"
                  type="password"
                  name="password"
                  value={registerForm.password}
                  onChange={updateRegisterForm}
                  placeholder="Minimum 6 characters"
                  autoComplete="new-password"
                  required
                />
              </div>

              <div className="student-field-group">
                <label htmlFor="student-confirm-password">Confirm Password</label>
                <input
                  id="student-confirm-password"
                  type="password"
                  name="confirmPassword"
                  value={registerForm.confirmPassword}
                  onChange={updateRegisterForm}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                />
              </div>

              <button className="student-auth-submit" type="submit">Create Account</button>
              <div className={`student-auth-status ${status.type}`}>
                {status.message}
              </div>

              <div className="student-auth-footer">
                Already a member? <Link to="/student/login">Login here</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
