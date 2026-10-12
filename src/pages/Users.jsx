import { useEffect } from "react";
import { useLibrary } from "../context/LibraryContext.jsx";
import LoginForm from "../components/LoginForm.jsx";
import NewUserForm from "../components/NewUserForm.jsx";
import UserRow from "../components/UserRow.jsx";

export default function Users() {
  const { users, currentUser } = useLibrary();

  useEffect(() => {
    document.title = "Users | Community Library";
  }, []);

  // not logged in -> login form
  if (!currentUser) {
    return (
      <div>
        <h2>User management</h2>
        <LoginForm />
      </div>
    );
  }

  // logged in but not an admin
  if (currentUser.role !== "admin") {
    return (
      <div>
        <h2>User management</h2>
        <p>
          Hello {currentUser.name}. Only admins can add, update or delete users.
        </p>
      </div>
    );
  }

  // admin view
  return (
    <div>
      <h2>User management</h2>

      <NewUserForm />

      <h3>All users</h3>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Membership ID</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
