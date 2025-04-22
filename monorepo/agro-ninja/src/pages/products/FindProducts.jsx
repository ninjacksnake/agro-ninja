import React, { useState, useEffect } from "react";

import ProductCardList from "./components/ProductCardList";

import ProductService from "../../services/Product.service";
import { Input, Space, Button, Tooltip, Drawer, Table } from "antd";
import { NavLink } from "react-router-dom";
import TableComponent from "../components/TableComponent";
import DrawerComponent from "../components/DrawerComponent";
import axios from "axios";
import ProductsTable from "./components/ProductsTable";



const FindProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtredProducts, setFiltredProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    ProductService.findAll().then((data) => {
      setProducts( data );
      setFiltredProducts(data);
    }).catch((error) => {
       console.log(error);
       // manejar el error 
    });
  }, []);

  const filterProducts = (e) => {
    if (e.target.value === undefined || e.target.value === "") {
      e.target.value = document.getElementById("si").value;
    }
    
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  setFiltredProducts(filteredProducts);
};

  const showDrawer = (name) => {
    const chosenProduct =
      filtredProducts.find((product) => product.name === name) ?? null;
    setSelectedProduct((p) => chosenProduct);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // const selectProduct = (name) => {
  //   const chosenProduct =
  //     filtredProducts.find((product) => product.name === name) ?? null;
  //     setSelectedProduct((p) => chosenProduct);
  //     setOpen(true);
  // };

  const getChemicalId = (name) => {

    return selectedProduct.chemicals.find((chemical) => chemical.name === name)?.id;

  }

  return (
    <div>
      <Space.Compact style={{ width: "100%", marginBottom: "2rem" }}>
        <Tooltip title="Agregar Producto" placement="rightBottom">
          <NavLink to={"/products/add"} >
            <Button type="primary" > + </Button>
          </NavLink>
        </Tooltip>
        <Input
          id="si"
          placeholder="Escriba aqui el producto que desea buscar"
          onKeyUp={filterProducts}
        />
        <Button type="primary" onClick={filterProducts}>
          Buscar
        </Button>
      </Space.Compact>
      {/* {filtredProducts.length > 0 ? <TableComponent data={products} columns={columns} module={'products'} showDrawer={showDrawer} /> : ""} */}
     
     
     
     <ProductsTable  data={filtredProducts}  />
    
    
    
    
      <DrawerComponent
        open={open}
        onClose={onClose}
        title={selectedProduct?.name}
        caption={"Componentes Quimicos"}
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            key: "id",
            render: (text) => <NavLink to={`/chemicals/details/${getChemicalId(text)}`}>{text}</NavLink>,
          },
        ]}
        data={selectedProduct?.chemicals}

      />

    </div>
  );
};

export default FindProducts;
