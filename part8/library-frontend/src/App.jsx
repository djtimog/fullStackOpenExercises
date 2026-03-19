import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("token"));

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

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
          <Route path="/new-book" element={<NewBook />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
