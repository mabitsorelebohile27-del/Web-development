// Each function returns an object of error messages (empty = valid)

export function validateBook(data, books, ignoreId = null) {
  const errors = {};
  if (!String(data.title).trim()) errors.title = "Title is required";
  if (!String(data.author).trim()) errors.author = "Author is required";
  if (!String(data.genre).trim()) errors.genre = "Genre is required";

  const isbn = String(data.isbn).trim();
  if (!isbn) {
    errors.isbn = "ISBN is required";
  } else if (books.some((b) => b.isbn === isbn && b.id !== ignoreId)) {
    errors.isbn = "This ISBN already exists";
  }

  const qty = Number(data.quantity);
  if (String(data.quantity).trim() === "" || !Number.isInteger(qty) || qty < 0) {
    errors.quantity = "Quantity must be a whole number (0 or more)";
  }
  return errors;
}

export function validateUser(data, users, ignoreId = null) {
  const errors = {};
  if (!String(data.name).trim()) errors.name = "Name is required";

  const memberId = String(data.membershipId).trim();
  if (!memberId) {
    errors.membershipId = "Membership ID is required";
  } else if (users.some((u) => u.membershipId === memberId && u.id !== ignoreId)) {
    errors.membershipId = "This membership ID is already taken";
  }
  return errors;
}
