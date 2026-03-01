import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

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
    </div>
  );
};

export default Authors;
