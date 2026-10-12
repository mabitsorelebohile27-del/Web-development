import { NavLink, Outlet } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function Layout() {
  const { currentUser, logout } = useLibrary();
  const isStaff =
    currentUser &&
    (currentUser.role === "admin" || currentUser.role === "librarian");

  return (
    <div className="shell">
      <aside className="sidebar">
        <h1 className="brand">Community Library</h1>

        <nav className="menu">
          <NavLink to="/" end>Dashboard</NavLink>
          {isStaff && <NavLink to="/books">Books</NavLink>}
          {isStaff && <NavLink to="/transactions">Transactions</NavLink>}
          <NavLink to="/users">{currentUser ? "Users" : "Login"}</NavLink>
        </nav>

        {currentUser && (
          <div className="session">
            <p>
              Signed in as <strong>{currentUser.name}</strong>
              <br />
              <span className="muted">{currentUser.role}</span>
            </p>
            <button onClick={logout}>Log out</button>
          </div>
        )}
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
