import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Products = () => {
  const navigate =  useNavigate();
  useEffect(() => { 
    navigate("/products/find");
  });
  return (
  <h1>Loading... Products</h1>
  );
};

export default Products;
