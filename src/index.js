import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import { isLoggedInVar, user } from "./store";
import { typeDefs } from "./graphql/clientTypedefs";
import { setContext } from "@apollo/client/link/context";

const httpLink = createUploadLink({
  uri: "https://commerce.api.oddatech.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      AuthPayload: {
        keyFields: [],
      },
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          user: {
            read() {
              return user();
            },
          },
          // products: {
          //   merge(existing, incoming, { args: { productInput: {offset = 0} } }) {
          //     // Slicing is necessary because the existing data is
          //     // immutable, and frozen in development.
          //     const merged = existing ? existing.slice(0) : [];
          //     for (let i = 0; i < incoming.length; ++i) {
          //       merged[offset + i] = incoming[i];
          //     }
          //     return merged;
          //   },
          // },
        },
      },
    },
  }),
  typeDefs,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
