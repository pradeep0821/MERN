const base =
  process.env.NODE_ENV === "production"
    ? "https://mern-production-2edc.up.railway.app" // your Railway backend
    : "http://localhost:5000"; // local dev

export async function apiFetch(path, options = {}) {
  const res = await fetch(base + "/api" + path, {
    credentials: "include", // send cookies cross-site
    headers: {
      "Content-Type": "application/json",
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
