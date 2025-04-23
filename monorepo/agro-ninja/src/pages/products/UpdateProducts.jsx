import React from "react";
import ProductForm from "./components/ProductForm";
import { useParams } from "react-router-dom";
import ProductForm2 from "./components/ProductForm2";

const UpdateProducts = () => {
  
 // console.log('from update', id)
  const product = JSON.parse(localStorage.getItem("SelectedproductsToUpdate"));
  //console.log("From update products: ", product);
  return (
    <>
      <h1>Modificar Producto</h1>
      <br />
      {/* <ProductForm isUpdate={true} product={product} id={id} />  */}
      <ProductForm2 isUpdate={true} product={product}   />
    </>
  );
};

export default UpdateProducts;
