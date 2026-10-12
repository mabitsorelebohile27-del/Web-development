import { useState } from "react";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function LoginForm() {
  const { login } = useLibrary();
  const [name, setName] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !membershipId.trim()) {
      setError("Enter your name and membership ID");
      return;
    }
    const ok = login(name, membershipId);
    setError(ok ? "" : "Name and membership ID do not match any user");
  };

  return (
    <form className="panel narrow" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="field">
        <label htmlFor="login-name">Name</label>
        <input
          id="login-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="login-id">Membership ID</label>
        <input
          id="login-id"
          value={membershipId}
          onChange={(e) => setMembershipId(e.target.value)}
        />
      </div>

      {error && <small className="error">{error}</small>}

      <button type="submit" className="primary">Log in</button>
      <p className="muted">First time? Use Admin / A001</p>
    </form>
  );
}
