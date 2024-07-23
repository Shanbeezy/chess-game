const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    wins: Int
    losses: Int
  }

  type Game {
    _id: ID
    user: User
    result: String
    date: String
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    users: [User]
    me: User
  }

  type Mutation {
    register(username: String, email: String, password: String): AuthPayload
  }
`;

module.exports = typeDefs;