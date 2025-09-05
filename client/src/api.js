const base = process.env.REACT_APP_API_URL || "http://localhost:5000";

export async function apiFetch(path, options = {}) {
  // Get token from localStorage (or sessionStorage)
  const token = localStorage.getItem("token");

  const res = await fetch(base + "/api" + path, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}
