import { AuditOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";

import { IKContext, IKImage } from "imagekitio-react";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const urlEndpoint = "https://ik.imagekit.io/kr9btn6cw/agroninja/";

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
          <IKImage
            path={dicease.photo}
            style={{
              borderRadius: "5px",
              border: "solid 0.2px gray",
            }}
          />
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
