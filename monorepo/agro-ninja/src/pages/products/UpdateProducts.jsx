import React from "react";
import ProductForm from "./components/ProductForm";
import { useParams } from "react-router-dom";

const UpdateProducts = () => {
  const id = useParams();
  const product = JSON.parse(localStorage.getItem("SelectedProductToUpdate"));
  return (
    <>
      <h1>Modificar Producto</h1>
      <br />
      <ProductForm isUpdate={true} product={product} id={id} />
    </>
  );
};

export default UpdateProducts;
