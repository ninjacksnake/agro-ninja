import {
  AuditOutlined,
  EditOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { IKContext, IKImage } from "imagekitio-react";
import React from "react";
import { useNavigate } from "react-router-dom";
const urlEndpoint = "https://ik.imagekit.io/kr9btn6cw/agroninja/";
const { Meta } = Card;

const ProductCard = ({ product, showDrawer }) => {
  const navigate = useNavigate();
  const goUpdate = async () => {
    if (product) {
      localStorage.clear();
      localStorage.setItem(
        "SelectedProductToUpdate",
        await JSON.stringify(product)
      );
    } else {
      return alert("Please select a product to update");
    }
    setTimeout(() => {
      localStorage.removeItem("SelectedProductToUpdate");
    }, 300000);
    navigate(`/products/update/${product.id}`);
  };

  // const decodeImage =  (photo)=>{
  //     try {
  //       const parsed =  JSON.parse(photo);
  //       return parsed
  //     } catch (error) {
  //       console.log(error)

  //     }
  // };

  return (
    <>
      <Card
        title={product.name}
        cover={
          <IKContext urlEndpoint={urlEndpoint}>
            <IKImage
              path={product.photo}
              style={{
                borderRadius: "5px",
                border: "solid 0.2px gray",
              }}
            />
          </IKContext>
        }
        actions={[
          <RadarChartOutlined
            key="setting"
            onClick={() => showDrawer(product.name)}
          />,
          <EditOutlined key="edit" onClick={() => goUpdate()} />,
          <AuditOutlined
            key="ellipsis"
            onClick={() => navigate(`/products/details/${product.id}`)}
          />,
        ]}
      >
        <Meta title={product.description} />
      </Card>
    </>
  );
};

export default ProductCard;
