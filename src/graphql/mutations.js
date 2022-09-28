import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($input: RegisterInput) {
    register(input: $input) {
      tokens {
        access_token
        refresh_token
        user {
          id
          email
        }
      }
      status
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput) {
    login(input: $input) {
      access_token
      refresh_token
      user {
        id
        email
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $category_id: String!
    $store_id: String!
    $attributes: [AttributeInput!]
    $brand_id: String!
    $sku: String!
    $name: String!
    $description: String!
  ) {
    createProduct(
      input: {
        sku: $sku
        name: $name
        description: $description
        category: { connect: $category_id }
        store: { connect: $store_id }
        brand: { connect: $brand_id }
        attributes: { create: $attributes }
      }
    ) {
      id
      name
      sku
      attributes {
        id
        name
        description
      }
    }
  }
`;

export const CREATE_PRODUCT_VARIANT = gql`
  mutation CreateVariant($input: ProductVariantInput!) {
    createProductVariant(input: $input) {
      id
      sku
      price
      description
    }
  }
`;

export const ADD_CAR = gql`
  mutation AddCar($carInput: CarData!) {
    addCar(carInput: $carInput) {
      _id
      name
    }
  }
`;
