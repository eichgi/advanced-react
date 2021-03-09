import React from 'react';
import {gql, useMutation} from '@apollo/client'
import {CURRENT_USER_QUERY} from "./User";

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

const SignOut = ({children}) => {

  const [signOut] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{
      query: CURRENT_USER_QUERY,
    }]
  });

  const logoutHandler = async () => {
    await signOut();
  };

  return (
    <button type="button" onClick={() => logoutHandler()}>Sign Out</button>
  );
};

export default SignOut;