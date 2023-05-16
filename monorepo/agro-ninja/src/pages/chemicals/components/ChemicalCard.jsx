import React from "react";
import { Card } from "antd";
import {
  AuditOutlined,
  EditOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";


import medBottle2 from "../../../assets/images/chemicalsImages/chem.png";
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const ChemicalCard = ({ chemical, showDrawer }) => { 
  console.log(chemical);
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
          src={medBottle2}
          style={{ width: "35%", marginLeft: "27%" }}
        />
      }
      actions={[
        <EditOutlined key="edit" onClick={()=>goUpdate()} />,
        <AuditOutlined key="ellipsis" />
      ]}
    >
      <Meta title="Test" description={chemical?.description} />
    </Card>
  );
};

export default ChemicalCard;
