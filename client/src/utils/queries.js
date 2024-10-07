import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      entries
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($id: ID!) {
    user(id: $id) {
      _id
      username
      entries
    }
  }
`;

export const QUERY_SEARCH_USERS = gql`
  query searchUsers($term: String) {
    users(term: $term) {
    _id
    username
    entries 
   }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      entries
    }
  }
`;

export const QUERY_ENTRIES = gql`
  query entries {
    entries {
      _id
      content
      date
     location
     picture
     title
      author {
       _id
       username
      }
    }
  }
`;

export const QUERY_SINGLE_ENTRY = gql`
  query entry($entryId: ID!) {
    entry(entryId: $entryId) {
    _id
    content
    date
    location
    picture
    title
      author {
       _id
       username
      }
    }
  }
`;
