import React from 'react';
import CartStyles from "./styles/CartStyles";
import useUser from "./User";
import Supreme from "./styles/Supreme";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";
import calcTotalPrice from "../lib/calcTotalPrice";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;

  img {
    margin-right: 1rem;

  }

  h3, p {
    margin: 0;
  }
`;

const CartItem = ({cartItem}) => {
  const {product} = cartItem;

  if (!product) {
    return null;
  }

  return <CartItemStyles>
    <img src={product.photo.image.publicUrlTransformed} alt={product.name} width="100"/>
    <div>
      <h3>{product.name}</h3>
      <p>
        {formatMoney(product.price * cartItem.quantity)}
         -
        <em>{cartItem.quantity} &times; {formatMoney(product.price)}</em>
      </p>
    </div>
  </CartItemStyles>;
}

const Cart = () => {
  const me = useUser();

  if (!me) {
    return null;
  }

  console.log(me);

  return (
    <CartStyles open={true}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
      </header>
      <ul>
        {me.cart.map(cartItem => (
          <CartItem key={cartItem.id}
                    cartItem={cartItem}/>
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
};

export default Cart;