import {gql, useQuery} from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        # Todo: query the cart once we have it
      }
    }
  }
`;

const useUser = () => {
  const {data} = useQuery(CURRENT_USER_QUERY);

  return data?.authenticatedItem;
};

export default useUser;