import React from 'react';
import Head from "next/head";
import PaginationStyles from "./styles/PaginationStyles";

import {gql, useQuery} from "@apollo/client";
import Link from "next/link";
import DisplayError from "./ErrorMessage";

import {perPage} from "../config";

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

const Pagination = ({page}) => {

  const {loading, error, data} = useQuery(PAGINATION_QUERY);

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return <DisplayError error={error}/>;
  }

  //console.log("Pagination: ", data);
  const count = data._allProductsMeta.count;
  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits - Page {page} of {count}</title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>Prev</a></Link>
      <p>Page {page} of {pageCount}</p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next</a>
    </Link>
    </PaginationStyles>
  );
};

export default Pagination;