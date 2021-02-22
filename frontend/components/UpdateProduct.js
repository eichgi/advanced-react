import React from 'react';
import {gql, useMutation, useQuery} from "@apollo/client";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";
import Router from "next/router";
import useForm from "../lib/useForm";

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: {id: $id}) {
      id
      name
      price
      description
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: {
        name: $name,
        description: $description,
        price: $price,
      }
    ) {
      id
      name
      description
      price
    }
  }
`;

const UpdateProduct = ({id}) => {

  //1. Get product
  const {data, error, loading} = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {id},
  });

  //2. Get mutation to update
  const [updateProduct, {
    data: updateData,
    error: updateError,
    loading: updateLoading
  }] = useMutation(UPDATE_PRODUCT_MUTATION);

  const {inputs, handleChange, clearForm, resetForm} = useForm(data?.Product);
  console.log(inputs);
  if (loading) {
    return <p>loading...</p>;
  }

  //3. Form to handle the updates

  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log(inputs);

    //Submit input field
    const res = await updateProduct({
      variables: {
        id,
        name: inputs.name,
        description: inputs.description,
        price: inputs.price,
      }
    }).catch(console.error);
    console.log("Response data: ", res);
    //clearForm();

    //Go to products page
    //await Router.push({pathname: `/product/${res.data.createProduct.id}`});
  };

  return (
    <Form onSubmit={handleSubmit}>

      <DisplayError error={error || updateError}/>

      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input type="text"
                 name="name"
                 id="name"
                 placeholder="Name"
                 value={inputs.name}
                 onChange={handleChange}/>
        </label>

        <label htmlFor="price">
          Price
          <input type="number"
                 name="price"
                 id="price"
                 placeholder="Price"
                 value={inputs.price}
                 onChange={handleChange}/>
        </label>

        <label htmlFor="description">
          Description
          <textarea name="description"
                    id="description"
                    placeholder="Description"
                    value={inputs.description}
                    onChange={handleChange}/>
        </label>

        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
};

export default UpdateProduct;