import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

function Users() {
  const users = useSelector((state) => state.usersInfos);
  return (
    <div>
      <h3>Users</h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Users;
