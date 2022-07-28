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

export const ADD_CAR = gql`
  mutation AddCar($carInput: CarData!) {
    addCar(carInput: $carInput) {
      _id
      name
    }
  }
`;
