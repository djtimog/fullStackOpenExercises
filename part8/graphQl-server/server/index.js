import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typeDefs.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import { User } from "../models/user.js";

const getUserFromAuth = async (auth) => {
  if (!auth) return null;
  if (!auth.startWith("Bearer ")) return null;

  const token = auth.subString(7);
  const decodedToken = jwt.verify(token, SECRET);

  return await User.findOne({ username: decodedToken.username });
};

export const startServer = (port) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  startStandaloneServer(server, {
    listen: { port },
    context: async ({ req, res }) => {
      const auth = req.headers.authorization;
      const currentUser = await getUserFromAuth(auth);

      return { currentUser };
    },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};
