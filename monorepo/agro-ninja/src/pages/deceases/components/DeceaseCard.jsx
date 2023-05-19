import React from "react";
import { Card } from "antd";
import {
  AuditOutlined,
  EditOutlined,
  
} from "@ant-design/icons";


import medBottle2 from "../../../assets/images/chemicals/chem.png";
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const DeceaseCard = ({ decease, showDrawer }) => { 
  console.log(decease);
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
        <img
          alt={`Imagen de ${decease?.name}`}
          src={medBottle2}
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
