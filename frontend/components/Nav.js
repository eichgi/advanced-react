import React from 'react';
import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import useUser from "./User";
import SignOut from "./SignOut";

const Nav = () => {

  const user = useUser();

  //console.log(user);

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {
        user && (
          <>
            <Link href="/sell">Sell</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/account">Account</Link>
            <SignOut/>
          </>
        )
      }
      {
        !user && (
          <>
            <Link href="/signin">Sign in</Link>
          </>
        )
      }
    </NavStyles>
  );
};

export default Nav;