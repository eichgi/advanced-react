import React from 'react';
import {useQuery, gql} from "@apollo/client";
import styled from "styled-components";
import Product from "./Product";
import {perPage} from "../config";

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

const Products = ({page}) => {

  const {loading, error, data} = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    }
  });

  console.log(loading, error, data)

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map(product =>
          <Product key={product.id} product={product}/>
        )}
      </ProductsListStyles>
    </div>
  );
};

export default Products;