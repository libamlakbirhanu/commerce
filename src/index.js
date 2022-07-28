import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import { isLoggedInVar, user } from "./store";
import { typeDefs } from "./graphql/clientTypedefs";

export const client = new ApolloClient({
  uri: "http://localhost:5001/graphql",
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
              return user()
            }
          }
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
