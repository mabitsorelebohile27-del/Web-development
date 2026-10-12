# Community Library System (version 2)

React library management system for BIWA2110 Individual Assignment 2. All data is saved in the browser's local storage.

## Run

```
npm install
npm run dev
```

Open the link shown in the terminal (usually http://localhost:5173).

## Login

First login: name `Admin`, membership ID `A001`.

Roles:
- **admin** - everything, including user management
- **librarian** - books and transactions
- **member** - dashboard only

## Pages

| Page | Route | What it does |
| --- | --- | --- |
| Dashboard | `/` | Book availability cards, search, low-stock highlight (fewer than 2 copies) |
| Books | `/books` | Add form, editable book list with Update / Delete |
| Transactions | `/transactions` | Add stock, deduct stock (borrow), history log with filter |
| Users | `/users` | Login form; admin can add, update and delete users |

## What it demonstrates

- Hooks: `useState`, `useEffect`, `useContext`, plus a custom `useStored` hook for local storage
- Lifecycle via `useEffect` (saving data, setting page titles)
- Component composition: `Layout`, `BookCard`, `NewBookForm`, `BookRow`, `LoginForm`, `NewUserForm`, `UserRow`, `RequireRole`
- Controlled forms with validation (`src/utils/validate.js`)
- React Router: nested layout route, protected routes, redirects

## Deploy

Push to GitHub and import the repo on vercel.com. `vercel.json` makes page refreshes work.
