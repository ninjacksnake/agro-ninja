import React from "react";
import { Card } from "antd";
import {
  AuditOutlined,
  EditOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";

import medBottle from "../../../assets/images/productsImages/medbottle2.png";
import medBottle2 from "../../../assets/images/productsImages/medicineBottle.png";
import { NavLink, useNavigate } from 'react-router-dom';

const { Meta } = Card;

const ProductCard = ({ product, showDrawer }) => { 
  const navigate =useNavigate();
  const goUpdate = async  () =>{  
    if(product){
      localStorage.setItem('SelectedProductToUpdate', await JSON.stringify(product));
    }else{
      return alert('Please select a product to update')
    }
    setTimeout(() => {
      localStorage.removeItem('SelectedProductToUpdate');
    }, 300000);
    navigate(`/products/update/${product.id}`)
  }
  return (
    <Card
      title={product.name}
      cover={
        <img
          alt={`Imagen de ${product.name}`}
          src={medBottle2}
          style={{ width: "35%", marginLeft: "27%" }}
        />
      }
      actions={[
        <RadarChartOutlined key="setting" onClick={() => showDrawer(product.name)} />,
        <EditOutlined key="edit" onClick={()=>goUpdate()} />,
        <AuditOutlined key="ellipsis" />
      ]}
    >
      <Meta title="Test" description={product.description} />
    </Card>
  );
};

export default ProductCard;
