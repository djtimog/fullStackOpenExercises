import axios from "axios";
const loginUrl = "/api/login";

const login = (credentials) => {
  const request = axios.post(loginUrl, credentials);
  return request.then((response) => response.data);
};

export default { login };
