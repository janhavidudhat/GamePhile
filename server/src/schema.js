const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    GamesForHome: [Game]
  }

  type Game {
    id: ID!
    title: String!
    description: String
    thumbnail: String
    author: String
    length: Int
    numberOfPlayers: Int
  }

  input GameInput {
    title: String!
    description: String
    thumbnail: String
    author: String
    length: Int
    numberOfPlayers: Int
  }

  input UpdateBoardGameInput {
    title: String
    description: String
    thumbnail: String
    author: String
    length: Int
    numberOfPlayers: Int
  }

  type Mutation {
    createBoardGame(input: GameInput!): Game
    updateBoardGame(id: ID!, input: UpdateBoardGameInput!): Game
  }


  "Author of a complete Track or a Module"
  type Author {
    id: ID!
    "Author's first and last name"
    name: String!
    "Author's profile picture"
    photo: String
  }
`;

module.exports = typeDefs;
