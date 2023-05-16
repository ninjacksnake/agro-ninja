import React, { useState } from "react";
import { Card, List, Drawer, Table } from "antd";
import { NavLink } from "react-router-dom";
import ChemicalCard from './../../chemicals/components/ChemicalCard';



const ProductCardList = ({ products }) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showDrawer = (name) => {
    const chosenProduct = products.find((product) => product.name === name)?? null;
    setSelectedProduct((p) => chosenProduct);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <List
        grid={{ gutter: 26, column: 4 }}
        dataSource={products}
        renderItem={(product, index) => (
          <List.Item>
           <ChemicalCard product={product} showDrawer={showDrawer}/>
          </List.Item>
        )}
      />
      <Drawer
        title={selectedProduct?.name}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <h2>Componentes Quimicos :</h2>
        <ol>
          <Table
          pagination={false}
          dataSource={selectedProduct?.chemicals}
          columns={[{title: 'Name', dataIndex: 'name', key: 'id' , render: (text)=> <NavLink to={'/'}>{text}</NavLink>}]}
          >
          </Table>
        </ol>
      </Drawer>
    </>
  );
};

export default ProductCardList;
