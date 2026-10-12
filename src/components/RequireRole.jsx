import { Navigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext.jsx";

// Only shows the page if the logged-in user has one of the allowed roles
export default function RequireRole({ roles, children }) {
  const { currentUser } = useLibrary();

  if (!currentUser) return <Navigate to="/users" />;

  if (!roles.includes(currentUser.role)) {
    return <p>You do not have permission to view this page.</p>;
  }

  return children;
}
