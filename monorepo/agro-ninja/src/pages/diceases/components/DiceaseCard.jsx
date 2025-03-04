import { AuditOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Image, Upload } from "antd";
import React from "react";

import { IKContext, IKImage } from "imagekitio-react";
import { useNavigate } from "react-router-dom";
import config from "../../../app.config.js"; 

const { Meta } = Card;
const urlEndpoint = config.development.apiUrl;
const uploadPath = config.development.uploadPath;
const module = config.development.modules.diceases;

const DiceaseCard = ({ dicease, showDrawer }) => {
  const navigate = useNavigate();
  const goUpdate = async () => {
    if (dicease) {
      localStorage.clear();
      localStorage.setItem(
        "SelectedDiceaseToUpdate",
        await JSON.stringify(dicease)
      );
    } else {
      return alert("Please select a dicease to update");
    }
    setTimeout(() => {
      localStorage.removeItem("SelectedDiceaseToUpdate");
    }, 300000);
    navigate(`/diceases/update/${dicease.id}`);
  };
  return (
    <Card
      title={dicease?.name}
      cover={
        <Image 
        src={`${urlEndpoint}${uploadPath}${module}/${dicease.photo}`} alt={dicease.name} 
         style={{height: '120px',  width: '120px', objectFit: 'scale-down' , margin: '20px'}} 
        />
      }
      actions={[
        <EditOutlined key="edit" onClick={() => goUpdate()} />,
        <AuditOutlined
          key="ellipsis"
          onClick={() => navigate(`/diceases/details/${dicease?.id}`, dicease)}
        />,
      ]}
    >
      <Meta title={dicease.name} description={dicease?.description} />
    </Card>
  );
};

export default DiceaseCard;
