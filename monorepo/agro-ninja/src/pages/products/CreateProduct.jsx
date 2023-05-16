import React from "react";
import ProductForm from "./components/ProductForm";
import {} from "antd";

const CreateProduct = () => {
  return (
    <>
      <h1>Agregar Producto</h1>
      <br />
      <ProductForm isUpdate={false} />
    </>
  );
};

export default CreateProduct;
