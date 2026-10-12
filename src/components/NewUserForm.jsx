import { useState } from "react";
import { useLibrary } from "../context/LibraryContext.jsx";
import { validateUser } from "../utils/validate.js";

const empty = { name: "", membershipId: "", role: "member" };

export default function NewUserForm() {
  const { users, addUser } = useLibrary();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateUser(form, users);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    addUser({
      name: form.name.trim(),
      membershipId: form.membershipId.trim(),
      role: form.role,
    });
    setForm(empty);
  };

  return (
    <form className="panel form-grid" onSubmit={handleSubmit}>
      <h2>Add a new user</h2>

      <div className="field">
        <label htmlFor="user-name">Name</label>
        <input id="user-name" name="name" value={form.name} onChange={handleChange} />
        {errors.name && <small className="error">{errors.name}</small>}
      </div>

      <div className="field">
        <label htmlFor="user-id">Membership ID</label>
        <input
          id="user-id"
          name="membershipId"
          value={form.membershipId}
          onChange={handleChange}
        />
        {errors.membershipId && (
          <small className="error">{errors.membershipId}</small>
        )}
      </div>

      <div className="field">
        <label htmlFor="user-role">Role</label>
        <select id="user-role" name="role" value={form.role} onChange={handleChange}>
          <option value="member">Member</option>
          <option value="librarian">Librarian</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button type="submit" className="primary">Add user</button>
    </form>
  );
}
