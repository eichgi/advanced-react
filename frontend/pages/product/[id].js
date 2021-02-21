import SingleProduct from "../../components/SingleProduct";

const SingleProductPage = ({query}) => {
  //console.log("ID: ", query);
  return (
    <SingleProduct id={query.id}/>
  );
};

export default SingleProductPage;