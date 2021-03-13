import React from 'react';
import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

const ResetPage = (props) => {
  console.log(props);

  if (!props?.query?.token) {
    return <>
      <p>Sorry you must supply a token</p>
      <RequestReset/>
    </>
  }

  return (
    <div>
      <p>RESET YOUR PASSWORD</p>
      <Reset token={props.query.token}/>
    </div>
  );
};

export default ResetPage;