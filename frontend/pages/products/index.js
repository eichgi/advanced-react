import React from 'react';
import Products from "../../components/Products";
import Pagination from "../../components/Pagination";
import {useRouter} from "next/router";
import {parse} from "graphql";


const Index = () => {
  const {query} = useRouter();
  const page = parseInt(query.page);
  return (
    <div>
      <Pagination page={page || 1}/>
      <Products page={page || 1}/>
      <Pagination page={page || 1}/>
    </div>
  );
};

export default Index;