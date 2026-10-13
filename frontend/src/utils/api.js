const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const API_ORIGIN = new URL(API_BASE).origin;

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

  if (response.status === 204) return null;
  return response.json();
}

export function resolveAssetUrl(url) {
  return url?.startsWith('/api/') || url?.startsWith('/uploads/')
    ? `${API_ORIGIN}${url}`
    : url;
}