import React from "react";
import { Card, Image } from "antd";
import {
  AuditOutlined,
  EditOutlined,
  
} from "@ant-design/icons";


import noPhoto from "../../../assets/images/chemicals/no-photos.png";
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const DeceaseCard = ({ decease, showDrawer }) => { 
  const navigate =useNavigate();
  const goUpdate = async  () =>{  
    if(decease){
      localStorage.setItem('SelectedDeceaseToUpdate', await JSON.stringify(decease));
    }else{
      return alert('Please select a decease to update')
    }
    setTimeout(() => {
      localStorage.removeItem('SelectedDeceaseToUpdate');
    }, 300000);
    navigate(`/deceases/update/${decease.id}`)
  }
  return (
    <Card
      title={decease?.name}
      cover={
        <Image
          alt={`Imagen de ${decease?.name}`}
          src={decease?.photo ? JSON.parse(decease?.photo) : noPhoto}
          style={{ width: "35%", marginLeft: "27%" }}
        />
      }
      actions={[
        <EditOutlined key="edit" onClick={()=>goUpdate()} />,
        <AuditOutlined key="ellipsis" />
      ]}
    >
      <Meta title="Test" description={decease?.description} />
    </Card>
  );
};

export default DeceaseCard;
