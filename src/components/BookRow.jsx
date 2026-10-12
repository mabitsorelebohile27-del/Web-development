import { useState } from "react";
import { useLibrary } from "../context/LibraryContext.jsx";
import { validateBook } from "../utils/validate.js";

// One row of the books table. "Update" turns the row into editable inputs.
export default function BookRow({ book }) {
  const { books, updateBook, deleteBook } = useLibrary();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(book);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const found = validateBook(draft, books, book.id);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    updateBook(book.id, {
      title: String(draft.title).trim(),
      author: String(draft.author).trim(),
      genre: String(draft.genre).trim(),
      isbn: String(draft.isbn).trim(),
      quantity: Number(draft.quantity),
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(book);
    setErrors({});
    setEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Delete "' + book.title + '"?')) deleteBook(book.id);
  };

  if (!editing) {
    return (
      <tr>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.genre}</td>
        <td>{book.isbn}</td>
        <td>{book.quantity}</td>
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
        <td><input name="title" value={draft.title} onChange={handleChange} /></td>
        <td><input name="author" value={draft.author} onChange={handleChange} /></td>
        <td><input name="genre" value={draft.genre} onChange={handleChange} /></td>
        <td><input name="isbn" value={draft.isbn} onChange={handleChange} /></td>
        <td>
          <input
            name="quantity"
            type="number"
            value={draft.quantity}
            onChange={handleChange}
          />
        </td>
        <td className="actions">
          <button className="primary" onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </td>
      </tr>
      {messages.length > 0 && (
        <tr>
          <td colSpan="6" className="error">{messages.join(" · ")}</td>
        </tr>
      )}
    </>
  );
}
