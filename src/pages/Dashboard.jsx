import { useState, useEffect } from "react";
import { useLibrary } from "../context/LibraryContext.jsx";
import BookCard, { LOW_STOCK_LIMIT } from "../components/BookCard.jsx";

export default function Dashboard() {
  const { books } = useLibrary();
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Dashboard | Community Library";
  }, []);

  const lowCount = books.filter((b) => b.quantity < LOW_STOCK_LIMIT).length;
  const totalCopies = books.reduce((sum, b) => sum + b.quantity, 0);

  const shown = books.filter((b) => {
    const text = (b.title + " " + b.author + " " + b.genre).toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div>
      <h2>Book availability</h2>

      <div className="stats">
        <div className="stat">
          <span>{books.length}</span> titles
        </div>
        <div className="stat">
          <span>{totalCopies}</span> copies in stock
        </div>
        <div className="stat warn">
          <span>{lowCount}</span> low stock
        </div>
      </div>

      <input
        className="search"
        placeholder="Search by title, author or genre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {books.length === 0 && (
        <p className="muted">
          No books in the library yet. Staff can add books on the Books page.
        </p>
      )}
      {books.length > 0 && shown.length === 0 && <p>No books match your search.</p>}

      <div className="card-grid">
        {shown.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
