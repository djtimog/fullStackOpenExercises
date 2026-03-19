import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = () => {
  const request = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState("ALL");

  if (request.loading) {
    return "Loading...";
  }
  const books = [...request.data.allBooks];
  const allGenres = [...new Set(books.flatMap((book) => book.genres))];

  const filteredBooks = books.filter((book) => {
    if (genre === "ALL") {
      return true;
    } else {
      return book.genres.includes(genre);
    }
  });
  return (
    <div>
      <h2>books</h2>
      in {genre} genre
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres.map((genre) => (
        <button onClick={() => setGenre(genre)}>{genre}</button>
      ))}
      <button onClick={() => setGenre("ALL")}>All</button>
    </div>
  );
};

export default Books;
