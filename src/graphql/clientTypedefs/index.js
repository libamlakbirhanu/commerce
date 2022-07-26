import { gql } from "@apollo/client";

export const typeDefs = gql`
  extend type UserType {
    id: ID!
    email: String!
  }

  extend type Query {
    isLoggedIn: Boolean!
    user: UserType!
  }
`;
