import { useState } from "react";
import { useLibrary } from "../context/LibraryContext.jsx";
import { validateBook } from "../utils/validate.js";

const empty = { title: "", author: "", genre: "", isbn: "", quantity: "" };

export default function NewBookForm() {
  const { books, addBook } = useLibrary();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateBook(form, books);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    addBook({
      title: form.title.trim(),
      author: form.author.trim(),
      genre: form.genre.trim(),
      isbn: form.isbn.trim(),
      quantity: Number(form.quantity),
    });
    setForm(empty);
  };

  return (
    <form className="panel form-grid" onSubmit={handleSubmit}>
      <h2>Add a new book</h2>

      <div className="field">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" value={form.title} onChange={handleChange} />
        {errors.title && <small className="error">{errors.title}</small>}
      </div>

      <div className="field">
        <label htmlFor="author">Author</label>
        <input id="author" name="author" value={form.author} onChange={handleChange} />
        {errors.author && <small className="error">{errors.author}</small>}
      </div>

      <div className="field">
        <label htmlFor="genre">Genre</label>
        <input id="genre" name="genre" value={form.genre} onChange={handleChange} />
        {errors.genre && <small className="error">{errors.genre}</small>}
      </div>

      <div className="field">
        <label htmlFor="isbn">ISBN</label>
        <input id="isbn" name="isbn" value={form.isbn} onChange={handleChange} />
        {errors.isbn && <small className="error">{errors.isbn}</small>}
      </div>

      <div className="field">
        <label htmlFor="quantity">Initial quantity</label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
        />
        {errors.quantity && <small className="error">{errors.quantity}</small>}
      </div>

      <button type="submit" className="primary">Add book</button>
    </form>
  );
}
