import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await apiFetch("/auth/me");
        setUser(data.user);
      } catch (err) {
        nav("/login");
      }
    })();
  }, [nav]);

  async function logout() {
    await apiFetch("/auth/logout", { method: "POST" });
    nav("/login");
  }

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Welcome! {user.name}</h2>
      <p>{user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
