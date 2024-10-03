import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_JOURNAL  = gql`
    mutation addJournal($username: String!, $title: String!, $content: String!) {
      addJournal(username: $username, title: $title, content: $content) {
        token
        user {
          _id
          username
          entries
        }
        
      }
    }
`

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

