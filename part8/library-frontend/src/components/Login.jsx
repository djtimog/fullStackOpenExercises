import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../queries";
import { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [loginUser] = useMutation(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.login.value);
      navigate("/");
      window.location.reload();
    },
    onError: (error) => setError(error.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({
      variables: { username, password },
    });
  };

  return (
    <div>
      {error}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />

        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default Login;
