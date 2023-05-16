import React, { useState, useEffect } from "react";

import ProductCard from "./components/ProductCardList";

import ApiService from "./../../services/Api.service";
import { Input, Space, Button } from "antd";

const FindProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtredProducts, setFiltredProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await ApiService.Products.findAll();
        setProducts((r) => result);
        setFiltredProducts((r) => result);
      } catch (error) 
      {
        console.log(error)
      }
    }
    getData();

  }, []);

  const filterProducts = (e) => {
    if (e.target.value === undefined || e.target.value === "") {
      e.target.value = document.getElementById("si").value;
    }
    console.log(e.target.value);
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFiltredProducts(filteredProducts);
  };

  return (
    <div>
      <Space.Compact style={{ width: "100%", marginBottom: "2rem" }}>
        <Input
          id="si"
          placeholder="Escriba aqui el producto que desea buscar"
          onKeyUp={filterProducts}
        />
        <Button type="primary" onClick={filterProducts}>
          Buscar
        </Button>
      </Space.Compact>
      <ProductCard products={filtredProducts} />
    </div>
  );
};

export default FindProducts;
