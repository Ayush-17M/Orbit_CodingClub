import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/student-auth.css';
import { fetchApi } from '../../utils/api';

const emptyLoginForm = { email: '', password: '' };
const emptyRegisterForm = { name: '', email: '', password: '', confirmPassword: '' };

export default function StudentAuth({ mode = 'login' }) {
  const isLogin = mode === 'login';
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState(emptyLoginForm);
  const [registerForm, setRegisterForm] = useState(emptyRegisterForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const updateLoginForm = (event) => {
    const { name, value } = event.target;
    setLoginForm((current) => ({ ...current, [name]: value }));
  };

  const updateRegisterForm = (event) => {
    const { name, value } = event.target;
    setRegisterForm((current) => ({ ...current, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    setSubmitting(true);

    try {
      const data = await fetchApi('/auth/student/login', {
        method: 'POST',
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
      });

      sessionStorage.setItem('orbit-student-session', JSON.stringify({
        name: data.name,
        email: data.login,
        role: data.role,
      }));
      sessionStorage.setItem('orbit_token', data.token);
      setStatus({ type: 'success', message: 'Login successful. Redirecting...' });
      navigate('/student/dashboard');
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to log in.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    if (registerForm.password !== registerForm.confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    setSubmitting(true);
    try {
      const data = await fetchApi('/auth/student/register', {
        method: 'POST',
        body: JSON.stringify({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
        }),
      });

      sessionStorage.setItem('orbit-student-session', JSON.stringify({
        name: data.name,
        email: data.login,
        role: data.role,
      }));
      sessionStorage.setItem('orbit_token', data.token);
      setStatus({ type: 'success', message: 'Account created successfully. Redirecting...' });
      navigate('/student/dashboard');
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to create your account.' });
    } finally {
      setSubmitting(false);
    }
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

              <button className="student-auth-submit" type="submit" disabled={submitting}>
                {submitting ? 'Please wait...' : 'Login'}
              </button>
              {status.message && (
                <div className={`student-auth-status ${status.type}`} role="status">
                  {status.message}
                </div>
              )}

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
                  autoComplete="name"
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
                <label htmlFor="student-password">Password</label>
                <input
                  id="student-password"
                  type="password"
                  name="password"
                  value={registerForm.password}
                  onChange={updateRegisterForm}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  minLength={8}
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
                  minLength={8}
                  required
                />
              </div>

              <button className="student-auth-submit" type="submit" disabled={submitting}>
                {submitting ? 'Please wait...' : 'Create Account'}
              </button>
              {status.message && (
                <div className={`student-auth-status ${status.type}`} role="status">
                  {status.message}
                </div>
              )}

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
