import React, {useState} from 'react';
import useForm from "../lib/useForm";
import Form from "./styles/Form";

const CreateProduct = () => {

  const {inputs, handleChange, clearForm, resetForm} = useForm({
    image: '',
    name: 'Backpack',
    price: 99,
    description: 'The best thing ever'
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(inputs);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset>
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