import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query($page: Int) {
    characters(page: $page, filter: { name: "rick" }) {
      info {
        count
      }
      results {
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
