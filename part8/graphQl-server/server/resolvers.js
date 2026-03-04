import { v1 as uuid } from "uuid";
import { Book } from "../models/book.js";
import { Author } from "../models/author.js";
import { GraphQLError } from "graphql";

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
  },
  Mutation: {
    addBook: async (root, args) => {
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
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
      return storedBook;
    },
    editAuthor: async (root, args) => {
      const author = Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      return author.save();
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
