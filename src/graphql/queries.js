import { gql } from "@apollo/client";

export const GET_ROLES = gql`
  query Roles {
    roles {
      id
      name
    }
  }
`;

export const GET_USER = gql`
  query Me {
    me {
      id
      email
      roles {
        id
        name
      }
    }
  }
`;

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
        id
        name
        products {
          id
          name
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      sku
      description
      attributes {
        id
        name
        attributeOptions {
          id
          name
        }
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
`;

export const GET_PRODUCTS = gql`
  query GetProducts($first: Int!, $page: Int, $search: String) {
    products(first: $first, page: $page, search: $search) {
      paginatorInfo {
        currentPage
        lastPage
      }
      data {
        id
        name
        sku
        description
        attributes {
          id
          name
          attributeOptions {
            id
            name
          }
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

export const GET_PRODUCT_VARIANTS = gql`
  query GetProductVariants($first: Int!, $page: Int) {
    productVariants(first: $first, page: $page) {
      paginatorInfo {
        currentPage
        lastPage
      }
      data {
        id
        sku
        price
        description
        product {
          id
          name
          description
        }
      }
    }
  }
`;

export const GET_PRODUCT_ATTRIBUTES = gql`
  query GetProductsAttributes($first: Int!, $product_id: String) {
    productAttributes(first: $first, product_id: $product_id) {
      data {
        id
        product {
          id
          sku
          name
        }
        attribute {
          id
          name
          description
        }
      }
    }
  }
`;

export const GET_CART_ITEMS = gql`
  query GetCartItems($first: Int!) {
    cartItems(first: $first) {
      data {
        unit_price
        id
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
