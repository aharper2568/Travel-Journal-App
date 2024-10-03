const typeDefs = `#graphql
  type User {
  _id: ID
  username: String
  email: String
  entries: [Entry]
}

type Entry {
  _id: ID
  author: User        
  title: String!
  location: String!
  date: String!
  picture: String
  content: String!
}

type Auth {
  token: ID!
  user: User
}

type Query {
  users: [User]!
  user(id: ID!): User
  searchUsers(term: String!): [User]!
  me: User
  entries: [Entry]
  entry(entryId: ID!): Entry 
}

input AddUserInput {
  email: String!
  username: String!
  password: String!
}

input AddEntryInput {
  title: String!
  location: String!
  date: String!
  picture: String
  content: String!
}

type Mutation {
  addUser(input: AddUserInput!): Auth
  login(email: String!, password: String!): Auth
  addEntry(input: AddEntryInput!): Entry
  removeEntry(entryId: ID!): User
}`
module.exports = typeDefs;
