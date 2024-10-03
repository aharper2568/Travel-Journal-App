const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    password: String
    entries: [String]
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
  }

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth

    addJournal(profileId: ID!, entry: [String!]) : User
  }
`;

module.exports = typeDefs;
