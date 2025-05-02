import React from "react";
import ProductForm from "./components/ProductForm";
import { useParams } from "react-router-dom";
import UpdateProductForm from "./components/UpdateProductForm";

const UpdateProducts = () => {
  
  const { id } = useParams();
  return (
    <>
      <h1>Modificar Producto</h1>
      <br />
      {/* <ProductForm isUpdate={true} product={product} id={id} />  */}
      <UpdateProductForm id={id}   />
    </>
  );
};

export default UpdateProducts;
