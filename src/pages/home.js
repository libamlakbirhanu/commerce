import React from "react";
import { gql, NetworkStatus, useLazyQuery } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";
import { client } from "../index";

function Home() {
  const [
    getCharacters,
    { loading, error, data, refetch, networkStatus, fetchMore },
  ] = useLazyQuery(GET_CHARACTERS, {
    variables: { page: 1 },
    notifyOnNetworkStatusChange: true,
    // fetchPolicy: "network-only", // Used for first execution
    // nextFetchPolicy: "cache-first", // Used for subsequent executions
    onCompleted: () => console.log("done successfully"),
  });

  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const changeCache = (name) => {
    client.writeFragment({
      id: "Character:1", // The value of the to-do item's cache ID

      fragment: gql`
        fragment MyCharacter on Character {
          name
        }
      `,
      data: {
        name,
      },
    });
  };

  return (
    <div>
      {data &&
        data.characters.results.map((result, index) => {
          console.log(`${result.__typename}:${result.id}`);
          return <h1 key={index}>{result.name}</h1>;
        })}

      <button onClick={() => getCharacters()}>fetch!</button>
      <button onClick={() => refetch()}>Refetch!</button>
      <button onClick={() => fetchMore()}>next page</button>
      <button onClick={() => changeCache(`change name of the first character ${Math.random() * 10 + 1}`)}>
        change name
      </button>
    </div>
  );
}

export default Home;
