import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Mutation($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation Mutation($input: SignupInput!) {
    signup(input: $input) {
      token
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation Mutation($input: SaveBookInput!) {
    saveBook(input: $input) {
      id
      username
      email
      password
      bookCount
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation Mutation($bookId: String!) {
    removeBook(bookId: $bookId) {
      id
      username
      email
      password
      bookCount
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
