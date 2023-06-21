import React from "react";
import { Card , Image, message} from "antd";
import {
  AuditOutlined,
  EditOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";

import { NavLink, useNavigate } from 'react-router-dom';


const { Meta } = Card;

const ProductCard = ({ product, showDrawer }) => {
 
  const navigate =useNavigate();
  const goUpdate = async  () =>{  
    if(product){
      localStorage.clear();
      localStorage.setItem('SelectedProductToUpdate', await JSON.stringify(product));
    }else{
      return alert('Please select a product to update')
    }
    setTimeout(() => {
      localStorage.removeItem('SelectedProductToUpdate');
    }, 300000);
    navigate(`/products/update/${product.id}`)
  }

const decodeImage =  (photo)=>{
    try {
      const parsed =  JSON.parse(photo);
     
      return parsed
    } catch (error) {
      console.log(error)
      
    }
};
 
  return (
    <Card
      title={product.name}
      cover={
        <Image
          alt={`Imagen de ${product.name}`}
          src= { decodeImage(product.photo)}
          style={{ width: "35%", marginLeft:"35%" }}
        />
      }
      actions={[
        <RadarChartOutlined key="setting" onClick={() => showDrawer(product.name)} />,
        <EditOutlined key="edit" onClick={()=>goUpdate()} />,
        <AuditOutlined key="ellipsis" onClick={ ()=> navigate(`/products/details/${product.id}`)} />
      ]}
    >
      <Meta title={product.description}  />
    </Card>
  );
};

export default ProductCard;
