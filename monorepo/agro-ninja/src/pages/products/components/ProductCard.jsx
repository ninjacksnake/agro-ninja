import {
  AuditOutlined,
  EditOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import { Card, Image, Tooltip } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
const urlEndpoint = "http://localhost:3004/api/upload/products/";
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


  return (
    <>
      <Card
        title={product.name}



        cover={

          <Image
            onClick={() => navigate(`/products/details/${product.id}`)}
            preview={false}
            src={`${urlEndpoint}${product.photo}`} alt={product.name}
            style={{}}
          />

        }


        actions={[
          <Tooltip title="Ver componentes" placement="bottom">

            <RadarChartOutlined
              key="setting"
              onClick={() => showDrawer(product.name)}
            />
          </Tooltip>
          ,
          <Tooltip title="Editar producto" placement="bottom" >

            <EditOutlined key="edit" onClick={() => goUpdate()} />
          </Tooltip>

          /* ,
          <Tooltip  title="Ver Detalles" placement="bottom">

          <AuditOutlined
            key="ellipsis"
            onClick={() => navigate(`/products/details/${product.id}`)}
            /> 
            </Tooltip>
            ,
            */
        ]}
      >
        <Meta title={product.description} />
      </Card>
    </>
  );
};

export default ProductCard;
