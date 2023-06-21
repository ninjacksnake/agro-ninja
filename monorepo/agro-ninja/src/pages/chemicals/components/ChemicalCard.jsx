import React from "react";
import { Card , Image} from "antd";
import {
  AuditOutlined,
  EditOutlined,
  
} from "@ant-design/icons";


import noPhoto from "../../../assets/images/chemicals/no-photos.png";
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const ChemicalCard = ({ chemical, showDrawer }) => { 
  
  const navigate =useNavigate();
  const goUpdate = async  () =>{  
    if(chemical){
      localStorage.clear();
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
        <Image
          alt={`Imagen de ${chemical?.name}`}
          src={chemical?.photo ? JSON.parse(chemical?.photo) : noPhoto}
          style={{ width: "35%", marginLeft: "27%" }}
        />
      }
      actions={[
        <EditOutlined key="edit" onClick={()=>goUpdate()} />,
        <AuditOutlined key="ellipsis" onClick={()=>  navigate(`/chemicals/details/${chemical.id}`)} />
      ]}
    >
      <Meta title={chemical?.name} description={chemical?.description} />
    </Card>
  );
};

export default ChemicalCard;
