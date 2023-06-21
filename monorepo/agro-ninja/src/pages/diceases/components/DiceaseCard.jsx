import React from "react";
import { Card, Image } from "antd";
import {
  AuditOutlined,
  EditOutlined,
  
} from "@ant-design/icons";


import noPhoto from "../../../assets/images/chemicals/no-photos.png";
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const DiceaseCard = ({ dicease, showDrawer }) => { 
  const navigate =useNavigate();
  const goUpdate = async  () =>{  
    if(dicease){
      localStorage.clear();
      localStorage.setItem('SelectedDiceaseToUpdate', await JSON.stringify(dicease));
    }else{
      return alert('Please select a dicease to update')
    }
    setTimeout(() => {
      localStorage.removeItem('SelectedDiceaseToUpdate');
    }, 300000);
    navigate(`/diceases/update/${dicease.id}`)
  }
  return (
    <Card
      title={dicease?.name}
      cover={
        <Image
          alt={`Imagen de ${dicease?.name}`}
          src={dicease?.photo ? JSON.parse(dicease?.photo) : noPhoto}
          style={{ width: "35%", marginLeft: "27%" }}
        />
      }
      actions={[
        <EditOutlined key="edit" onClick={()=>goUpdate()} />,
        <AuditOutlined key="ellipsis" onClick={()=> navigate(`/diceases/details/${dicease?.id}`, dicease)} />
      ]}
    >
      <Meta title={dicease.name} description={dicease?.description} />
    </Card>
  );
};

export default DiceaseCard;
