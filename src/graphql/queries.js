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

export const GET_CATEGORIES = gql`
  query GetCategories($first: Int!, $page: Int, $search: String) {
    categories(first: $first, page: $page, search: $search) {
      data {
        id
        name
        parentCategory {
          id
        }
        products {
          id
          name
        }
      }
    }
  }
`;

export const GET_BRANDS = gql`
query GetBrands($first: Int!, $page: Int) {
  brands(first: $first, page: $page) {
      data {
          id,
          name,
          products {
              id,
              name
          }
      }
  }
}
`

export const GET_PRODUCTS = gql`
  query GetProducts($first: Int!, $page: Int, $search: String) {
    products(first: $first, page: $page, search: $search) {
      data {
        id
        name
        sku
        attributes {
          id
          name
        }
        productVariants {
          id
          sku
          price
        }
        productVariantAttributes {
          id
        }
      }
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
