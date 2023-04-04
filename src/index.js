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
import { AbilityContext } from "./casl/can";
import ability from "./casl/ability";

const httpLink = createUploadLink({
  uri: process.env.REACT_APP_API_URL,
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
          productVariants: {
            keyArgs: false,
            merge(existing, incoming, { args: { first, page } }) {
              // Slicing is necessary because the existing data is
              // immutable, and frozen in development.
              console.log(incoming);
              const merged = {
                ...existing,
                ...incoming,
                data: [...(existing?.data || []), ...incoming.data],
              };

              return merged;
            },
          },
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
          <AbilityContext.Provider value={ability}>
            <App />
          </AbilityContext.Provider>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
