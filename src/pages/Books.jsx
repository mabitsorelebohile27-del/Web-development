import { useEffect } from "react";
import { useLibrary } from "../context/LibraryContext.jsx";
import NewBookForm from "../components/NewBookForm.jsx";
import BookRow from "../components/BookRow.jsx";

export default function Books() {
  const { books } = useLibrary();

  useEffect(() => {
    document.title = "Books | Community Library";
  }, []);

  return (
    <div>
      <h2>Book management</h2>

      <NewBookForm />

      <h3>All books</h3>
      {books.length === 0 ? (
        <p className="muted">No books yet. Add the first one above.</p>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>ISBN</th>
                <th>Qty</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <BookRow key={book.id} book={book} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
