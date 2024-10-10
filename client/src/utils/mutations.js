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
  mutation removeUser($_id: ID!) {
    removeUser(_id: $_id) {
        _id
        username
    }
  }
`

export const ADD_ENTRY = gql`
  mutation addEntry($title: String!, $location: String!, $date: String!, $picture: String, $content: String!) {
    addEntry(title: $title, location: $location, date: $date, picture: $picture, content: $content) {
      _id
      title
      location
      date
      picture
      content
      author {
        _id
        username
      }
    }
  }
`;


export const REMOVE_ENTRY = gql`
  mutation removeEntry($entryId: ID!) {
    removeEntry(entryId: $entryId) {
      _id
      title
      content
    }
  }
`;

export const UPDATE_ENTRY = gql`
  mutation updateEntry($entryId: ID!, $title: String!, $location: String!, $date: String!, $content: String) {
    updateEntry(entryId: $entryId, title: $title, location: $location, date: $date, content: $content) {
      _id
      title
      location
      date
      content
      author {
        _id
        username
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

export const UPLOAD_IMAGE = gql`
  mutation uploadImage($id: String!, $image: Upload!) {
    uploadImage(id: $id, image: $image) {
      secure_url
    }
  }
`;
