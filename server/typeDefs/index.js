const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    bookId: ID!
    authors: [String!]
    description: String!
    image: String
    link: String
    title: string!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String
    savedBooks: [Book]
    bookCount: Int!
  }

  type SignupSuccess {
    success: Boolean!
  }
  type LoginSuccess {
    success: Boolean!
    token: String!
    user: User!
  }

  type AuthResponse {
    token: String!
    user: User
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input SaveBookInput {
    bookId: String!
    authors: [String]
    image: String
    title: String
    description: String
    link: String
  }

  type Query {
    me: User!
  }

  type Mutation {
    signup(input: SignupInput!): AuthResponse
    login(input: LoginInput!): AuthResponse
    saveBook(input: SaveBookInput!): User!
    removeBook(bookId: String!): User!
  }
`;
