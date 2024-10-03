const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    password: String
    entries: [String]
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

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth

    saveEntry(title: String!, location: String!, date: String!, picture: String, content: String!): User
    removeEntry(entryId: ID!): User
`;

module.exports = typeDefs;
