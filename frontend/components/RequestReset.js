import React from 'react';
import Form from "./styles/Form";
import useForm from "../lib/useForm";
import {gql, useMutation} from "@apollo/client";
import DisplayError from "./ErrorMessage";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const RequestReset = () => {

  const {inputs, handleChange, resetForm} = useForm({
    email: '',
  });

  const [requestPasswordReset, {data, loading, error}] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    //Send credentials to GraphqlAPI
    const res = await requestPasswordReset().catch(console.error);
    console.log(res);
    console.log({data, loading, error});

    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a password reset</h2>

      <DisplayError error={error}/>

      <fieldset>
        {data?.sendUserPasswordResetLink === null && <p>Success! Check your email for the link</p>}
        <label htmlFor="email">
          Email
          <input type="email"
                 id="email"
                 name="email"
                 placeholder="Your email address"
                 autoComplete="email"
                 value={inputs.email}
                 onChange={handleChange}/>
        </label>

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;