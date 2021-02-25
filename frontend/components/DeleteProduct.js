import React from 'react';
import {gql, useMutation} from "@apollo/client";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const update = (cache, payload) => {
  //console.log(payload);
  //console.log("running update function after delete");

  cache.evict(cache.identify(payload.data.deleteProduct));
};

const DeleteProduct = ({id, children}) => {

  const [deleteProduct, {loading, error}] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: {id},
    update,
  });

  const deleteHandler = () => {
    if (confirm('Are you sure?')) {
      deleteProduct().catch(error => alert(error.message));
      //delete the product
      //console.log('DELETE: ', res);
    }
  };

  return (
    <button type="button"
            onClick={() => deleteHandler()}
            disabled={false}>{children}</button>
  );
};

export default DeleteProduct;