import React from "react";
import { NetworkStatus, useLazyQuery } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "./graphql/queries";

function App() {
  const [getCharacters, { loading, error, data, refetch, networkStatus, fetchMore }] =
    useLazyQuery(GET_CHARACTERS, {
      variables: { page: 1 },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only", // Used for first execution
      nextFetchPolicy: "cache-first", // Used for subsequent executions
      onCompleted: () => console.log('done successfully')
    });

  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data &&
        data.characters.results.map((result, index) => (
          <h1 key={index}>{result.name}</h1>
        ))}

      <button onClick={() => getCharacters()}>fetch!</button>
      <button onClick={() => refetch({ page: Math.ceil(Math.random() * 5) })}>
        Refetch!
      </button>
      <button onClick={() => fetchMore()}>next page</button>
    </div>
  );
}

export default React.memo(App);
