import React from 'react';
import Products from "../components/Products";
import Pagination from "../components/Pagination";

const products = () => {
  return (
    <div>
      <Pagination page={4}/>
      <Products/>
      <Pagination page={4}/>
    </div>
  );
};

export default products;