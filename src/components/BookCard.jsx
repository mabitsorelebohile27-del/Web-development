export const LOW_STOCK_LIMIT = 2;

export default function BookCard({ book }) {
  const isLow = book.quantity < LOW_STOCK_LIMIT;

  return (
    <article className={isLow ? "book-card low" : "book-card"}>
      <h3>{book.title}</h3>
      <p>by {book.author}</p>
      <p className="muted">
        {book.genre} · ISBN {book.isbn}
      </p>
      <p className="copies">
        {book.quantity} {book.quantity === 1 ? "copy" : "copies"}
      </p>
      {isLow && <span className="tag">Low stock</span>}
    </article>
  );
}
