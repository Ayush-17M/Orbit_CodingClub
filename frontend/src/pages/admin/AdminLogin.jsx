import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from '../../utils/api';

export default function AdminLogin() {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');

  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const data = await fetchApi('/auth/admin/login', {
        method: 'POST',
        body: JSON.stringify({ username: u, password: p }),
      });

      sessionStorage.setItem('orbit_token', data.token);
      sessionStorage.setItem('admin-auth', '1');
      nav('/admin');
    } catch (error) {
      setErr(error.message || 'Invalid admin credentials.');
    }
  };

  return (
    <div className="admin-login section-black">
      <form onSubmit={submit}>
        <span className="eyebrow">
          ADMIN ACCESS
        </span>

        <h1>
          CONTROL THE CONTENT.
        </h1>

        <p>
          Sign in with the admin credentials configured for the backend.
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
          Admin credentials are configured on the backend.
        </small>
      </form>
    </div>
  );
}