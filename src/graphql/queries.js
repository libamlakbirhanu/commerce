import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query($page: Int) {
    characters(page: $page, filter: { name: "rick" }) {
      info {
        count
      }
      results {
        name
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }
`;

// client side queries

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const USER = gql`
  query USER {
    user @client
  }
`;