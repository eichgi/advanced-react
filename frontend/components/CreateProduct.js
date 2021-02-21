import React, {useState} from 'react';
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import {gql, useMutation} from "@apollo/client";
import DisplayError from "./ErrorMessage";
import {ALL_PRODUCTS_QUERY} from "./Products";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    #variables
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(data: {
      name: $name
      description: $description
      price: $price
      status: "AVAILABLE"
      photo: {
        create: {
          image: $image
          altText: $name
        }
      }
    }) {
      id
      price
      description
      name
    }
  }
`;

const CreateProduct = () => {

  const {inputs, handleChange, clearForm, resetForm} = useForm({
    image: '',
    name: 'Backpack',
    price: 99,
    description: 'The best thing ever'
  });

  const [createProduct, {loading, error, data}] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: inputs,
    refetchQueries: [
      {query: ALL_PRODUCTS_QUERY},
    ],
  });

  //console.log(createProduct);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log(inputs);

    //Submit input field
    await createProduct();
    console.log("Response data: ", data);
    clearForm();
  };

  return (
    <Form onSubmit={handleSubmit}>

      <DisplayError error={error}/>

      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input type="file"
                 name="image"
                 id="image"
                 required
                 onChange={handleChange}/>
        </label>

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

        {/*<button type="button" onClick={clearForm}>Clear Form</button>*/}
        {/*<button type="button" onClick={resetForm}>Reset Form</button>*/}
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
};

export default CreateProduct;