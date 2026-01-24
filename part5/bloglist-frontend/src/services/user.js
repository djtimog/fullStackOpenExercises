import axios from "axios";
const loginUrl = "/api/login";

const login = async (credentials) => {
  const request = await axios.post(loginUrl, credentials);
  return request.data;
};

export default { login };
