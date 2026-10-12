import { useState, useEffect } from "react";
import { useLibrary } from "../context/LibraryContext.jsx";

const typeLabels = {
  restock: "Stock added",
  borrow: "Borrowed",
};

export default function Transactions() {
  const { books, history, recordTransaction } = useLibrary();
  const [bookId, setBookId] = useState("");
  const [type, setType] = useState("restock");
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    document.title = "Transactions | Community Library";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = recordTransaction(Number(bookId), type, Number(qty));
    setMessage(error);
    if (!error) setQty(1);
  };

  const shownHistory =
    filter === "all" ? history : history.filter((h) => h.type === filter);

  return (
    <div>
      <h2>Transactions</h2>

      <form className="panel narrow" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="tx-book">Book</label>
          <select
            id="tx-book"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          >
            <option value="">Select a book</option>
            {books.map((b) => (
              <option key={b.id} value={b.id}>
                {b.title} ({b.quantity} in stock)
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <span className="label">What happened?</span>
          <label className="radio">
            <input
              type="radio"
              name="type"
              value="restock"
              checked={type === "restock"}
              onChange={(e) => setType(e.target.value)}
            />
            New books arrived (add stock)
          </label>
          <label className="radio">
            <input
              type="radio"
              name="type"
              value="borrow"
              checked={type === "borrow"}
              onChange={(e) => setType(e.target.value)}
            />
            Book borrowed (deduct stock)
          </label>
        </div>

        <div className="field">
          <label htmlFor="tx-qty">Quantity</label>
          <input
            id="tx-qty"
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </div>

        {message && <small className="error">{message}</small>}

        <button type="submit" className="primary">Record</button>
      </form>

      <div className="history-head">
        <h3>History</h3>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="restock">Stock added</option>
          <option value="borrow">Borrowed</option>
        </select>
      </div>

      {shownHistory.length === 0 ? (
        <p className="muted">Nothing recorded yet.</p>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Book</th>
                <th>Type</th>
                <th>Qty</th>
                <th>By</th>
              </tr>
            </thead>
            <tbody>
              {shownHistory.map((h) => (
                <tr key={h.id}>
                  <td>{h.date}</td>
                  <td>{h.bookTitle}</td>
                  <td>{typeLabels[h.type]}</td>
                  <td>{h.qty}</td>
                  <td>{h.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
