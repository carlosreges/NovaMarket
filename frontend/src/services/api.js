
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function apiRequest(endpoint, options = {}) {
  const { token, ...config } = options;

  const headers = {
    ...(config.body ? { "Content-Type": "application/json" } : {}),
    ...config.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...config,
    headers,
  });

  const data =
    response.status === 204
      ? null
      : await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || `Error HTTP ${response.status}`
    );
  }

  return data;
}
