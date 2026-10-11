const API_BASE = 'https://localhost:8080/api';

export async function fetchApi(endpoint, options = {}) {
  const token = sessionStorage.getItem('orbit_token');

  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || 'API request failed');
  }

  return response.json();
}