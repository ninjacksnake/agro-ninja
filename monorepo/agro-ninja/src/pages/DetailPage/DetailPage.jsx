import { Card, Col, Divider, Image, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import "./DetailPage.css";
import noPhoto from "../../assets/images/products/no-photos.png";
import { useLocation } from "react-router-dom";
import ProductService from "../../services/Product.service";
import DiceaseService from "../../services/Dicease.service";
import ChemicalService from "../../services/Chemical.service";

const chemicalsColumns = [
  {
    title: "Componente",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Descripción",
    dataIndex: "description",
    key: "description",
  },
];
const diceasesColumns = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Descripción",
    dataIndex: "description",
    key: "description",
  },
];

const DetailPage = () => {
  const [information, setInformation] = useState([]);
  const location = useLocation();
  const module = location.pathname.split("/").slice(1)[0];
  const pId = location.pathname.split("/").slice(-1)[0];
  useEffect(() => {
    let result;
    if (module === "products") {
      result = async () => {
        ProductService.Products.findById(pId)
          .then((products) => {
            setInformation(products);
          })
          .catch((error) => console.log(error));
      };
      result();
    } else if (module === "diceases") {
      result = async () => {
        DiceaseService.diceases.findById(pId)
          .then((diceases) =>{ setInformation(diceases)})
          .catch((error) => console.log(error));
      };
      result();
    } else if(module === "chemicals"){
      result = async () => {
        ChemicalService.Chemicals.findById(pId)
          .then((chemicals) => setInformation(chemicals))
          .catch((error) => console.log(error));
      };
      result();
    }
  }, []);

  return (
    <>
      <div className="detail-page-container">
        <Divider orientation="left">
          <h1>Detalle de {information?.name}</h1>
        </Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={8}>
            <div className="photo-box">
              <Image
                src={
                  information?.photo ? JSON.parse(information?.photo) : noPhoto
                }
                alt="Foto de "
                width="250px"
              />
            </div>
          </Col>
          <Col className="gutter-row" span={16}>
            <div className="box-1">
              <Card title="Descripción" bordered={true} hoverable={false}>
                <ul>
                  <p>Nombre: {information?.name ?? ""}</p>
                  <p>Descripción: {information?.description}</p>
                  <p>
                    {information?.category ? "Categoría :" : ""}{" "}
                    {information?.category ?? ""}
                  </p>
                  <p>
                    {information?.price ? "Precio :" : ""}{" "}
                    {information?.price ?? ""}
                  </p>
                </ul>
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {module !== "diceases" ? 
          <Col className="gutter-row" span={12}>
            <div className="tableContainer">
            <h2>{module === "diceases" ? `N/A`: module === "chemicals"? 'Componentes Relacionados': module === "products"? "Componentes": ""}</h2>
              <Table
                dataSource={module === "products" ? information?.chemicals: module === "chemicals" ? information.products :module === "diceases" ? [] : []}
                columns={chemicalsColumns}
                pagination={{position: ["bottomCenter"]}}
              />
            </div>
          </Col> : <Col className="gutter-row" span={8} />}
          {module !== "chemicals" ?
          <Col className="gutter-row" span={12}>
            <div className="tableContainer">
              <h2>{module === "diceases" ? `Productos relacionados`: module === "chemicals"? 'N/A': module === "products"? "Enfermedades Relacionadas": ""}</h2>
              <Table
                dataSource={module === "diceases" ? information?.products : module === "products" ? information.diceases: []}
                columns={diceasesColumns}
                pagination={{position: ["bottomCenter"]}}
              />
            </div>
          </Col> : null}
        </Row>
      </div>
    </>
  );
};

export default DetailPage;
