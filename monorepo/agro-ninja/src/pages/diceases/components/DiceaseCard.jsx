import { AuditOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";

import { IKContext, IKImage } from "imagekitio-react";
import { useNavigate } from "react-router-dom";
import Utils from "../../../services/Utils";

const { Meta } = Card;
const urlEndpoint = Utils.urlEndpoint;

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
        <IKContext urlEndpoint={urlEndpoint}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
              backgroundColor: "#f0f0f0",
            }}
          >
            <IKImage
              path={dicease.photo}
              style={{
                borderRadius: "5px",
                width: "150px",
                objectFit: "cover",
                border: "solid 0.1px #d0cccc",
              }}
            />
          </div>
        </IKContext>
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
