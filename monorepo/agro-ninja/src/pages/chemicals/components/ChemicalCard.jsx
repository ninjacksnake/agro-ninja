import { AuditOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Image, Tooltip } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import appConfig from "../../../app.config";



const { Meta } = Card;
const urlEndpoint = appConfig.development.apiUrl;
const uploadPath = appConfig.development.uploadPath;
const module = appConfig.development.modules.chemicals;

const ChemicalCard = ({ chemical, showDrawer }) => {
  const navigate = useNavigate();
  const goUpdate = async () => {
    if (chemical) {
      localStorage.clear();
      localStorage.setItem(
        "SelectedChemicalToUpdate",
        await JSON.stringify(chemical)
      );
    } else {
      return alert("Please select a chemical to update");
    }
    setTimeout(() => {
      localStorage.removeItem("SelectedChemicalToUpdate");
    }, 300000);
    navigate(`/chemicals/update/${chemical.id}`);
  };
  return (
    <>
      <Card
        title={chemical?.name}
        cover={
          <Image
            src={`${urlEndpoint}${uploadPath}${module}/${chemical.photo}`} alt={chemical.name}
            style={{ height: '120px', width: '120px', objectFit: 'scale-down', margin: '20px' }}
          />
        }
        style={{
          borderRadius: "5px",

          padding: "10px",
        }}
        actions={[
          <Tooltip title="Agregar Quimico" placement="bottom">

            <EditOutlined key="edit" onClick={() => goUpdate()} />
          </Tooltip>,
          <Tooltip title="Agregar Quimico" placement="bottom">
            <AuditOutlined
              key="ellipsis"
              onClick={() => navigate(`/chemicals/details/${chemical.id}`)}
            />
          </Tooltip>,
        ]}
      >
        <Meta title={chemical?.name} description={chemical?.description} />
      </Card>
    </>
  );
};

export default ChemicalCard;
