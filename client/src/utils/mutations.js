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

export const REMOVE_PROFILE = gql`
  mutation removeUser($id: ID!) {
    removeUser(id: $id) {
      token
      user {
        _id
        username
      }
    }
  }
`

export const ADD_ENTRY = gql`
  mutation addEntry($title: String!, $location: String!, $date: String!) {
  addEntry(title: $title, location: $location, date: $date) {
    token
    user {
      _id
      entries
    } 
  }
}
`;

export const REMOVE_ENTRY = gql`
  mutation removeEntry($entryId: ID!) {
  removeEntry(entryId: $entryId) {
    token
    user {
      _id
      entries
    } 
  }
}
`;

export const UPDATE_ENTRY = gql`
  mutation updateEntry($entryId: ID!, $title: String!, $location: String!, $date: String! ) {
  updateEntry(entryId: $entryId) {
    token
    user {
      _id
      entries
    } 
  }
}
`;


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

