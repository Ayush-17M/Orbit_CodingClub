import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const USER = 'admin';
const PASS = 'techkshitiz-demo';

export default function AdminLogin() {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');

  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    if (u === USER && p === PASS) {
      sessionStorage.setItem('admin-auth', '1');
      nav('/admin');
    } else {
      setErr('Invalid demo credentials.');
    }
  };

  return (
    <div className="admin-login section-black">
      <form onSubmit={submit}>
        <span className="eyebrow">
          ADMIN / DEMO
        </span>

        <h1>
          CONTROL THE CONTENT.
        </h1>

        <p>
          Frontend-only authentication.
          Connect real auth before production.
        </p>

        <label>
          USERNAME

          <input
            value={u}
            onChange={(e) => setU(e.target.value)}
            autoComplete="username"
          />
        </label>

        <label>
          PASSWORD

          <input
            type="password"
            value={p}
            onChange={(e) => setP(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        {err && (
          <div className="form-error">
            {err}
          </div>
        )}

        <button type="submit">
          ENTER ADMIN
          <span>↗</span>
        </button>

        <small>
          Demo credentials are configurable in{' '}
          <code>
            src/pages/AdminLogin.jsx
          </code>
          .
        </small>
      </form>
    </div>
  );
}