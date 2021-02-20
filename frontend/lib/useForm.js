import {useState} from 'react';
import {parse} from "graphql";

export default function useForm(initial = {}) {
  //create a state object for our fields

  const [inputs, setInputs] = useState(initial);

  const handleChange = (e) => {
    let {value, name, type} = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = e.target.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => {
    setInputs(initial);
  };

  const clearForm = () => {
    const blankState = Object.entries(inputs).map(([key, value]) => [key, ''])
    setInputs(Object.fromEntries(blankState));
  };

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  }
}