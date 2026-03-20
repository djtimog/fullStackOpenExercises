import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        bookCount
        born
        id
        name
      }
      id
      genres
    }
  }
`;

export const NEW_BOOK = gql`
  mutation newBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author {
        bookCount
        born
        id
        name
      }
      id
      genres
    }
  }
`;

export const SET_BIRTH_YEAR = gql`
  mutation setBirthYear($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      id
      name
      born
      bookCount
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription Subscription {
    bookAdded {
      title
      published
      author {
        bookCount
        born
        id
        name
      }
      id
      genres
    }
  }
`;
