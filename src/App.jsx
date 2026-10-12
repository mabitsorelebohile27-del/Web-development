import { Routes, Route, Navigate } from "react-router-dom";
import { LibraryProvider } from "./context/LibraryContext.jsx";
import Layout from "./components/Layout.jsx";
import RequireRole from "./components/RequireRole.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Books from "./pages/Books.jsx";
import Transactions from "./pages/Transactions.jsx";
import Users from "./pages/Users.jsx";

export default function App() {
  return (
    <LibraryProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/books"
            element={
              <RequireRole roles={["admin", "librarian"]}>
                <Books />
              </RequireRole>
            }
          />
          <Route
            path="/transactions"
            element={
              <RequireRole roles={["admin", "librarian"]}>
                <Transactions />
              </RequireRole>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </LibraryProvider>
  );
}
