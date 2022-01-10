import { gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($user: String!) {
    createUser(user: $user) {
      id
      name
      email
    }
  }
`;
