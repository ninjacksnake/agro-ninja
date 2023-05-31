import React from "react";
import { Card } from "antd";
import {
  AuditOutlined,
  EditOutlined,
  
} from "@ant-design/icons";


import noPhoto from "../../../assets/images/chemicals/no-photos.png";
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const ChemicalCard = ({ chemical, showDrawer }) => { 
  console.log('chemical card', chemical)
  const navigate =useNavigate();
  const goUpdate = async  () =>{  
    if(chemical){
      localStorage.setItem('SelectedChemicalToUpdate', await JSON.stringify(chemical));
    }else{
      return alert('Please select a chemical to update')
    }
    setTimeout(() => {
      localStorage.removeItem('SelectedChemicalToUpdate');
    }, 300000);
    navigate(`/chemicals/update/${chemical.id}`)
  }
  return (
    <Card
      title={chemical?.name}
      cover={
        <img
          alt={`Imagen de ${chemical?.name}`}
          src={chemical?.photo ? JSON.parse(chemical?.photo) : noPhoto}
          style={{ width: "35%", marginLeft: "27%" }}
        />
      }
      actions={[
        <EditOutlined key="edit" onClick={()=>goUpdate()} />,
        <AuditOutlined key="ellipsis" />
      ]}
    >
      <Meta title={chemical?.name} description={chemical?.description} />
    </Card>
  );
};

export default ChemicalCard;
