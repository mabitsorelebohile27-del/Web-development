import { useState } from "react";
import { useLibrary } from "../context/LibraryContext.jsx";
import { validateUser } from "../utils/validate.js";

export default function UserRow({ user }) {
  const { users, currentUser, updateUser, deleteUser } = useLibrary();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(user);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const found = validateUser(draft, users, user.id);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    updateUser(user.id, {
      name: draft.name.trim(),
      membershipId: draft.membershipId.trim(),
      role: draft.role,
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(user);
    setErrors({});
    setEditing(false);
  };

  const handleDelete = () => {
    if (currentUser && currentUser.id === user.id) {
      alert("You cannot delete the account you are logged in with.");
      return;
    }
    if (window.confirm("Delete " + user.name + "?")) deleteUser(user.id);
  };

  if (!editing) {
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.membershipId}</td>
        <td>{user.role}</td>
        <td className="actions">
          <button onClick={() => setEditing(true)}>Update</button>
          <button className="danger" onClick={handleDelete}>Delete</button>
        </td>
      </tr>
    );
  }

  const messages = Object.values(errors);

  return (
    <>
      <tr className="editing">
        <td><input name="name" value={draft.name} onChange={handleChange} /></td>
        <td>
          <input
            name="membershipId"
            value={draft.membershipId}
            onChange={handleChange}
          />
        </td>
        <td>
          <select name="role" value={draft.role} onChange={handleChange}>
            <option value="member">member</option>
            <option value="librarian">librarian</option>
            <option value="admin">admin</option>
          </select>
        </td>
        <td className="actions">
          <button className="primary" onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </td>
      </tr>
      {messages.length > 0 && (
        <tr>
          <td colSpan="4" className="error">{messages.join(" · ")}</td>
        </tr>
      )}
    </>
  );
}
