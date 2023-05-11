import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
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

// products: {
//   // keyArgs: ["first", "page"],
//   merge(
//     existing = { data: [], paginatorInfo: {} },
//     incoming,
//     { args: { first, page }, readField }
//   ) {
//     const newData = existing.data.slice(0);
//     if (page === 1) {
//       // If we are on the first page (offset is 0), add the incoming data at the beginning
//       newData.unshift(...incoming.data);
//     } else {
//       // If we are on any other page, merge the data normally
//       const existingIdSet = new Set(
//         newData.map((product) => readField("id", product))
//       );
//       const filteredIncoming = incoming.data.filter(
//         (product) => !existingIdSet.has(readField("id", product))
//       );
//       newData.push(...filteredIncoming);
//     }
//     return {
//       data: newData,
//       paginatorInfo: {
//         ...existing.paginatorInfo,
//         ...incoming.paginatorInfo,
//       },
//     };
//   },
//   read(
//     existing = { data: [], paginatorInfo: {} },
//     { args: { first, page } }
//   ) {
//     // Slice the data based on the limit and offset
//     const slicedData = existing.data.slice(
//       (page - 1) * first,
//       page * first
//     );

//     return {
//       data: slicedData,
//       paginatorInfo: existing.paginatorInfo,
//     };
//   },
// },
