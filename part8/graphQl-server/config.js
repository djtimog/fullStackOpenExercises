import { config } from "dotenv";
config();
const PORT = process.env.PORT;
const URI = process.env.DATABASE_URI;

export { PORT, URI };
