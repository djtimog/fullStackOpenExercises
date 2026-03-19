import { Book } from "../models/book.js";
import { Author } from "../models/author.js";
import { GraphQLError } from "graphql";
import { User } from "../models/user.js";
import { PASSWORD, SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const foundAuthor = await Author.findOne({ name: args.author });
        return Book.find({
          author: foundAuthor,
          genres: [args.genre],
        }).populate("author", {
          name: 1,
          id: 1,
          born: 1,
          bookCount: 1,
        });
      }

      if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author });
        return Book.find({ author: foundAuthor }).populate("author", {
          name: 1,
          id: 1,
          born: 1,
          bookCount: 1,
        });
      }

      if (args.genre) {
        return Book.find({ genres: [args.genre] }).populate("author", {
          name: 1,
          id: 1,
          born: 1,
          bookCount: 1,
        });
      }
      return Book.find({}).populate("author", {
        name: 1,
        id: 1,
        born: 1,
        bookCount: 1,
      });
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, { currentUser }) => currentUser,
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (currentUser) {
        let authorExists = await Author.findOne({ name: args.author });
        if (!authorExists) {
          const author = new Author({ name: args.author, born: null });
          try {
            authorExists = await author.save();
          } catch (error) {
            throw new GraphQLError(`Saving author failed: ${error.message}`, {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.author,
                error,
              },
            });
          }
        }
        const book = new Book({ ...args, author: authorExists._id });
        try {
          const storedBook = await book.save();

          await storedBook.populate("author", {
            name: 1,
            id: 1,
            born: 1,
            bookCount: 1,
          });
          return storedBook;
        } catch (error) {
          throw new GraphQLError(`Saving book failed: ${error.message}`, {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
              error,
            },
          });
        }
      } else {
        throw new GraphQLError(`Not authorized to create book`);
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (currentUser) {
        const author = Author.findOne({ name: args.name });
        if (!author) {
          return null;
        }
        author.born = args.setBornTo;
        return author.save();
      } else {
        throw new GraphQLError(`Not Authorised to edit author`);
      }
    },
    createUser: async (root, { username, favoriteGenre }) => {
      const foundUser = await User.findOne({ username });

      if (foundUser) {
        throw new GraphQLError(`user already exits`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: username,
          },
        });
      }
      const user = new User({ username, favoriteGenre });

      return user.save();
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user) {
        throw new GraphQLError(`user not found`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
          },
        });
      }
      const isPasswordValid = args.password === PASSWORD;

      if (!isPasswordValid) {
        throw new GraphQLError(`wrong password`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.password,
          },
        });
      }

      const token = jwt.sign({ user }, SECRET);

      return { value: token };
    },
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.find({ name: root.name });
      const authorBooks = await Book.find({ author });
      return authorBooks.length;
    },
  },
};
