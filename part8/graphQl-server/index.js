import { PORT, URI } from "./config.js";
import { connectToDatabase } from "./server/db.js";
import { startServer } from "./server/index.js";

const main = async () => {
  startServer(PORT);
  await connectToDatabase(URI);
};

main();
