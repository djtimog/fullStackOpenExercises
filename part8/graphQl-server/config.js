import { config } from "dotenv";
config();
const PORT = process.env.PORT;
const URI = process.env.DATABASE_URI;
const SECRET = process.env.JWT_SECRET;
const PASSWORD = process.env.PASSWORD;
export { PORT, URI, SECRET, PASSWORD };
