import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS } from "../queries";
import SetBirthYear from "./SetBirthYear";

const Authors = () => {
  const request = useQuery(ALL_AUTHORS);
  if (request.loading) {
    return "Loading...";
  }
  const authors = [...request.data.allAuthors];

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthYear authorsName={authors.map((a) => a.name)} />
    </div>
  );
};

export default Authors;
