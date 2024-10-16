const typeDefs = `#graphql
  scalar Upload

  type User {
    _id: ID
  username: String
  password: String
  email: String
  entries: [Entry]
  isAdmin: Boolean
}

type Image {
  secure_url: String!
}

type Entry {
  _id: ID
  author: User
  title: String!
  location: String!
  date: String!
  picture: String
  content: String
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

type Mutation {
  addUser(username:String!, email: String!, password: String!, isAdmin: Boolean): Auth
  login(email: String!, password: String!): Auth
  addEntry(title: String!, location: String!, date: String!, picture: String, content: String): Entry
  removeEntry(entryId: ID!): Entry
  removeUser(_id: ID!): User
  uploadImage(id: String!, image: Upload!): Image
  updateEntry(entryId: ID! title: String!, location: String!, date: String!, picture: String, content: String): Entry
}`
module.exports = typeDefs;
