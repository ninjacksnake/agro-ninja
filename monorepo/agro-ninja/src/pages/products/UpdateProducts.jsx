import React from "react";
import { useParams } from "react-router-dom";
import UpdateProductForm from "./components/UpdateProductForm";

const UpdateProducts = () => {
  const { id } = useParams();
  return <UpdateProductForm id={id} />;
};

export default UpdateProducts;
