import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";

const Recommendation = ({ user }) => {
  const request = useQuery(ALL_BOOKS);

  if (request.loading) {
    return "Loading...";
  }
  const books = request.data.allBooks;
  const filteredBooks = books.filter((book) =>
    book.genres.includes(user.favoriteGenre),
  );

  return (
    <div>
      <h2>books</h2>
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
    </div>
  );
};

export default Recommendation;
