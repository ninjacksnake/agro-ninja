import { AuditOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";

import { IKContext, IKImage } from "imagekitio-react";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const urlEndpoint = "https://ik.imagekit.io/kr9btn6cw/agroninja/";

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
          <IKContext urlEndpoint={urlEndpoint}>
            <IKImage
              path={chemical.photo}
              style={{
                borderRadius: "5px",
                border: "solid 0.2px gray",
              }}
            />
          </IKContext>
        }
        style={{
          borderRadius: "5px",

          padding: "10px",
        }}
        actions={[
          <EditOutlined key="edit" onClick={() => goUpdate()} />,
          <AuditOutlined
            key="ellipsis"
            onClick={() => navigate(`/chemicals/details/${chemical.id}`)}
          />,
        ]}
      >
        <Meta title={chemical?.name} description={chemical?.description} />
      </Card>
    </>
  );
};

export default ChemicalCard;
