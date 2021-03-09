import React from 'react';
import Form from "./styles/Form";
import useForm from "../lib/useForm";
import {gql, useMutation} from "@apollo/client";
import DisplayError from "./ErrorMessage";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $password: String!, $name: String!) {
    createUser(data: {
      email: $email,
      name: $name,
      password: $password
    }) {
      id
      email
      name
    }
  }
`;

const SignUp = () => {

  const {inputs, handleChange, resetForm} = useForm({
    email: '',
    password: '',
    name: '',
  });

  const [signup, {data, loading, error}] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    //Refetch queries
    // refetchQueries: [{
    //   query: CURRENT_USER_QUERY,
    // }]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    //Send credentials to GraphqlAPI
    const res = await signup().catch(console.error);
    console.log(res);
    console.log({data, loading, error});

    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign up for an account</h2>

      <DisplayError error={error}/>

      <fieldset>
        {data?.createUser && <p>Signed up with {data.createUser.email} - Please go ahead and Sign in</p>}
        <label htmlFor="email">
          Name
          <input type="text"
                 id="name"
                 name="name"
                 placeholder="Your name"
                 autoComplete="name"
                 value={inputs.name}
                 onChange={handleChange}/>
        </label>

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
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
};

export default SignUp;