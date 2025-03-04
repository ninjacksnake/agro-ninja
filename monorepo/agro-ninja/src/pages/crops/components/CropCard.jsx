import { AuditOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Image, Upload } from "antd";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import config from "../../../app.config.js"; 

const { Meta } = Card;
const urlEndpoint = config.development.apiUrl;
const uploadPath = config.development.uploadPath;
const module = config.development.modules.crops;

const CropCard = ({ crop, showDrawer }) => {
  const selectedIClassification = useState("");
  const navigate = useNavigate();
  const goUpdate = async () => {
    if (crop) {
      localStorage.clear();
      localStorage.setItem(
        "SelectedCropToUpdate",
        await JSON.stringify(crop)
      );
    } else {
      return alert("Please select a crop to update");
    }
    setTimeout(() => {
      localStorage.removeItem("SelectedCropToUpdate");
    }, 300000);
    navigate(`/crops/update/${crop.id}`);
  };
  return (
    <Card
      title={crop?.name}
      cover={
        <Image 
         src={`${urlEndpoint}${uploadPath}${module}/${crop.photo}`} alt={crop.name} 
         style={{height: '120px',  width: '120px', objectFit: 'scale-down' , margin: '20px'}} 
        />
      }
      actions={[
        <EditOutlined key="edit" onClick={() => goUpdate()} />,
        <AuditOutlined
          key="ellipsis"
          onClick={() => navigate(`/crops/details/${crop?.id}`, crop)}
        />,
      ]}
    >
      <Meta title={crop.name} description={crop?.description} />
    </Card>
  );
};

export default CropCard;
