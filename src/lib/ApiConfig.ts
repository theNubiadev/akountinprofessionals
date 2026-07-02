// Adjust this to match wherever your Express backend actually lives.
// Vite: set VITE_API_URL in .env. CRA: swap this for process.env.REACT_APP_API_URL.
export const API_BASE = import.meta.env?.VITE_API_URL || "/api";

export async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }

  return data;
}