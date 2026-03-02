import { PORT } from "./config.js";
import { startServer } from "./server/index.js";

const main = () => {
  startServer(PORT);
};

main();
