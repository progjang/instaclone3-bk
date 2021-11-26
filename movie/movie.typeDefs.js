import { gql } from "apollo-server";

export default gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    "A simple type for getting started!"
    movies: [Movie]
    movie(id:Int!): Movie
  }

  type Mutation {
    createMovie(title:String!, year:Int!, genre: String): Movie,
    updateMovie(id:Int!, year:Int): Movie,
    deleteMovie(id:Int!): Movie
  }
`;