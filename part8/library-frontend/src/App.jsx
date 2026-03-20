import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Recommendation from "./components/Recommendation";
import { jwtDecode } from "jwt-decode";
import { useSubscription } from "@apollo/client/react";
import { BOOK_ADDED } from "./queries";

const App = () => {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(jwtDecode(token).user);

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const book = data.data.bookAdded;
      alert(`${book.author.name} just added a book ${book.title}`);
    },
    onError: ({ error }) => {
      console.log(error);
    },
  });

  // console.log(
  //   "i am here",
  //   useSubscription(BOOK_ADDED, {
  //     onData: ({ data }) => {
  //       console.log(data);
  //     },
  //   }),
  // );

  return (
    <div>
      <div>
        <Link to={"/"}>
          <button>authors</button>
        </Link>
        <Link to={"/books"}>
          <button>books</button>
        </Link>
        {user ? (
          <>
            <Link to={"/new-book"}>
              <button>add book</button>
            </Link>
            <Link to={"/recommendation"}>
              <button>recommendation</button>
            </Link>
            <button onClick={logout}>log out</button>
          </>
        ) : (
          <Link to={"/login"}>
            <button>login</button>
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        {user ? (
          <>
            <Route path="/new-book" element={<NewBook />} />
            <Route
              path="/recommendation"
              element={<Recommendation user={user} />}
            />
          </>
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
