import React from 'react';
import PropTypes from "prop-types";

const Page = ({children, cool}) => {
  return (
    <div>
      <h2>I am the page</h2>
      {cool}
      {children}
    </div>
  );
};

Page.propTypes = {
  cool: PropTypes.string,
  children: PropTypes.any,
};

export default Page;