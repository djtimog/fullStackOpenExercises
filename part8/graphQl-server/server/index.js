import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typeDefs.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import { User } from "../models/user.js";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import http from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";

const getUserFromAuth = async (auth) => {
  if (!auth) {
    console.log("no auth provided");
    return null;
  }

  if (!auth.startsWith("Bearer ")) return null;

  const token = auth.substring(7);
  const decodedToken = jwt.verify(token, SECRET);
  return await User.findOne({ username: decodedToken.user.username });
};

export const startServer = async (port) => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req.headers.authorization;
        const currentUser = await getUserFromAuth(auth);
        return { currentUser };
      },
    }),
  );

  httpServer.listen(port, () =>
    console.log(`Server is now running on http://localhost:${port}`),
  );
};
