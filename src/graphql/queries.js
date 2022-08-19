import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query Characters($page: Int) {
    characters(page: $page, filter: { name: "rick" }) {
      info {
        count
      }
      results {
        id
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

export const GET_CARS = gql`
  query Cars {
    cars {
      _id
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
query GetProducts($first: Int!, $offset: Int!) {
  products(productInput: {first: $first, offset: $offset}) {
    id
    name
    description
    price
    sellAmount
    image
  }
}
`

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
