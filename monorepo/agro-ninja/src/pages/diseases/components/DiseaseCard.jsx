import { AuditOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Image, Upload } from "antd";
import React from "react";

import { IKContext, IKImage } from "imagekitio-react";
import { useNavigate } from "react-router-dom";
import config from "../../../app.config.js"; 

const { Meta } = Card;
const urlEndpoint = config.development.apiUrl;
const uploadPath = config.development.uploadPath;
const module = config.development.modules.diseases;

const DiseaseCard = ({ disease, showDrawer }) => {
  const navigate = useNavigate();
  const goUpdate = async () => {
    if (disease) {
      localStorage.clear();
      localStorage.setItem(
        "SelecteddiseaseToUpdate",
        await JSON.stringify(disease)
      );
    } else {
      return alert("Please select a disease to update");
    }
    setTimeout(() => {
      localStorage.removeItem("SelecteddiseaseToUpdate");
    }, 300000);
    navigate(`/diseases/update/${disease.id}`);
  };
  return (
    <Card
      title={disease?.name}
      cover={
        <Image 
        src={`${urlEndpoint}${uploadPath}${module}/${disease.photo}`} alt={disease.name} 
         style={{height: '120px',  width: '120px', objectFit: 'scale-down' , margin: '20px'}} 
        />
      }
      actions={[
        <EditOutlined key="edit" onClick={() => goUpdate()} />,
        <AuditOutlined
          key="ellipsis"
          onClick={() => navigate(`/diseases/details/${disease?.id}`, disease)}
        />,
      ]}
    >
      <Meta title={disease.name} description={disease?.description} />
    </Card>
  );
};

export default DiseaseCard;
