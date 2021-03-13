import React from 'react';
import Form from "./styles/Form";
import useForm from "../lib/useForm";
import {gql, useMutation} from "@apollo/client";
import DisplayError from "./ErrorMessage";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($email: String!, $password: String!, $token: String!) {
    redeemUserPasswordResetToken(email: $email, password: $password, token: $token) {
      code
      message
    }
  }
`;

const Reset = ({token}) => {

  const {inputs, handleChange, resetForm} = useForm({
    email: '',
    password: '',
    token,
  });

  const [resetPassword, {data, loading, error}] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const successfulError = data?.redeemUserPasswordResetToken?.code ? data.redeemUserPasswordResetToken : undefined;
  console.log(error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    //Send credentials to GraphqlAPI
    const res = await resetPassword().catch(console.error);
    console.log(res);
    console.log({data, loading, error});

    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset your password</h2>

      <DisplayError error={error || successfulError}/>

      <fieldset>
        {data?.redeemUserPasswordResetToken === null && <p>Success! You can now sign in</p>}
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

        <label htmlFor="password">
          Password
          <input type="password"
                 id="password"
                 name="password"
                 placeholder="Your password"
                 autoComplete="password"
                 value={inputs.password}
                 onChange={handleChange}/>
        </label>

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
};

export default Reset;