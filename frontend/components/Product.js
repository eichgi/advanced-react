import React from 'react';
import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import Link from "next/link";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";

const Product = ({product}) => {
  return (
    <ItemStyles>
      <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name}/>

      <Title>
        <Link href={`/product/${product.id}`}>
          {product.name}
        </Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      {/*Todo: add buttons to edit and delete items*/}
    </ItemStyles>
  );
};

export default Product;