import { createContext, useContext } from "react";
import useStored from "../hooks/useStored.js";

const LibraryContext = createContext(null);

const starterUsers = [
  { id: 1, name: "Admin", membershipId: "A001", role: "admin" },
];

export function LibraryProvider({ children }) {
  const [books, setBooks] = useStored("lib2_books", []);
  const [users, setUsers] = useStored("lib2_users", starterUsers);
  const [history, setHistory] = useStored("lib2_history", []);
  const [currentUser, setCurrentUser] = useStored("lib2_current", null);

  // ---------- books ----------
  const addBook = (book) =>
    setBooks((prev) => [...prev, { ...book, id: Date.now() }]);

  const updateBook = (id, changes) =>
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...changes } : b)));

  const deleteBook = (id) =>
    setBooks((prev) => prev.filter((b) => b.id !== id));

  // ---------- users ----------
  const addUser = (user) =>
    setUsers((prev) => [...prev, { ...user, id: Date.now() }]);

  const updateUser = (id, changes) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...changes } : u)));
    if (currentUser && currentUser.id === id) {
      setCurrentUser({ ...currentUser, ...changes });
    }
  };

  const deleteUser = (id) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

  // ---------- login ----------
  const login = (name, membershipId) => {
    const found = users.find(
      (u) =>
        u.name.toLowerCase() === name.trim().toLowerCase() &&
        u.membershipId === membershipId.trim()
    );
    if (!found) return false;
    setCurrentUser(found);
    return true;
  };

  const logout = () => setCurrentUser(null);

  // ---------- stock transactions ----------
  // returns an error message, or "" when everything went fine
  const recordTransaction = (bookId, type, qty) => {
    const book = books.find((b) => b.id === bookId);
    if (!book) return "Please select a book.";
    if (!Number.isInteger(qty) || qty < 1) {
      return "Quantity must be a whole number of at least 1.";
    }
    if (type === "borrow" && qty > book.quantity) {
      return "Only " + book.quantity + " copies available.";
    }

    const change = type === "restock" ? qty : -qty;
    updateBook(bookId, { quantity: book.quantity + change });
    setHistory((prev) => [
      {
        id: Date.now(),
        date: new Date().toLocaleString(),
        bookTitle: book.title,
        type,
        qty,
        by: currentUser ? currentUser.name : "-",
      },
      ...prev,
    ]);
    return "";
  };

  const value = {
    books,
    users,
    history,
    currentUser,
    addBook,
    updateBook,
    deleteBook,
    addUser,
    updateUser,
    deleteUser,
    login,
    logout,
    recordTransaction,
  };

  return (
    <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
  );
}

export function useLibrary() {
  return useContext(LibraryContext);
}
