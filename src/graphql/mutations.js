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
        roles {
          id
          name
        }
      }
    }
  }
`;

export const ASSIGN_ROLE = gql`
  mutation AssignRole($input: AssignRoleInput!) {
    assignRole(input: $input) {
      id
      name
    }
  }
`;

export const CREATE_STORE = gql`
  mutation CreateStore($input: StoreCreateInput!) {
    createStore(input: $input) {
      id
      name
      description
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
      product {
        id
        name
        description
      }
    }
  }
`;

// input: {
//   unit_price: 100,
//   quantity: 5,
//   productVariant: {connect: ""}
//   user: {connect: ""}
// }
export const CREATE_CART_ITEM = gql`
  mutation CreateCartItem($input: CartItemInput!) {
    createCartItem(input: $input) {
      id
      unit_price
      quantity
      productVariant {
        id
        price
        description
        images
        product {
          name
          description
        }
      }
    }
  }
`;

export const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($id: String!) {
    deleteCartItem(id: $id) {
      id
      unit_price
      quantity
      productVariant {
        id
        price
        description
        images
        product {
          name
          description
        }
      }
    }
  }
`;


export const UPDATE_CART_ITEM = gql`
  mutation updateCartItem($input: CartItemInput!) {
    updateCartItem(input: $input) {
      id
      quantity
      unit_price
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
