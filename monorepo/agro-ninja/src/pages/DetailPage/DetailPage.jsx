import { Alert, Card, Col, Divider, Empty, Row, Spin, Table, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChemicalService from "../../services/Chemical.service";
import DiseaseService from "../../services/Disease.service";
import ProductService from "../../services/Product.service";
import AppConfig from "../../app.config";
import "./DetailPage.css";

import noPhoto from "../../assets/images/no-photos.png"
import CropService from "../../services/Crop.service";



const urlEndpoint = AppConfig.development.apiUrl;
const uploadPath = AppConfig.development.uploadPath;

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

function getPhoto( urlEndpoint, uploadPath, module, photo){
  console.log(urlEndpoint, uploadPath, module, photo )
  if (photo){
    return `${urlEndpoint}${uploadPath}/${module}/${photo}`;
  }else{
    return noPhoto;
  }

} 

const DetailPage = () => {
  const [information, setInformation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const module = location.pathname.split("/").slice(1)[0];
  const pId = location.pathname.split("/").slice(-1)[0];
  // const apiUrl = AppConfig.development.apiUrl;
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (module === "products") {
          data = await ProductService.Products.findById(pId);
        //  console.log(data)
        } else if (module === "diseases") {
          data = await DiseaseService.diseases.findById(pId);
        } else if (module === "chemicals") {
          data = await ChemicalService.Chemicals.findById(pId);
        } else if (module === "crops"){
          data = await CropService.Crops.findById(pId);
         //console.log(data)
        }
        setInformation(data);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [module, pId]);

  if (loading) {
    return (
      <Spin
        size="large"
        style={{ display: "block", margin: "auto", paddingTop: "20%" }}
      />
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }
//console.log('Info',information)
  return (
    <div className="detail-page-container">
      <Divider orientation="left">
        <h1>Detalle de {information?.name}</h1>
      </Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={8}>
          <div className="photo-box">
             <Image
              src={getPhoto(urlEndpoint, uploadPath, module, information?.photo)}
              alt={`Foto de ${information?.name}`}
              width="250px"
            /> 
          </div>
        </Col>
        <Col className="gutter-row" span={16}>
          <div className="box-1">
            <Card title="Descripción" bordered={true} hoverable={false}>
              <ul>
                <p>Nombre: {information?.name ?? "N/A"}</p>
                <p>Descripción: {information?.description ?? "N/A"}</p>
                <p>
                  {information?.category?.name ? "Categoría :" : ""}{" "}
                  {information?.category?.name ?? "N/A"}
                </p>
                <p>
                  {information?.dossage ? "Dosificación :" : ""}{" "}
                  {information?.dossage ?? "N/A"}
                </p>
              </ul>
            </Card>
          </div>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {module !== "diceases" && (
          <Col className="gutter-row" span={12}>
            <div className="tableContainer">
              <h2>
                {module === "chemicals"
                  ? "Componentes Relacionados"
                  : module === "products"
                  ? "Componentes"
                  : ""}
              </h2>
              <Table
                dataSource={
                  module === "products"
                    ? information?.chemicals || []
                    : module === "chemicals"
                    ? information.products || []
                    : []
                }
                columns={chemicalsColumns}
                pagination={{ position: ["bottomCenter"] }}
                locale={{
                  emptyText: <Empty description="No Data Available" />,
                }}
              />
            </div>
          </Col>
        )}
        {module !== "chemicals" && (
          <Col className="gutter-row" span={12}>
            <div className="tableContainer">
              <h2>
                {module === "diseases"
                  ? "Productos relacionados"
                  : module === "products"
                  ? "Enfermedades Relacionadas"
                  : ""}
              </h2>
              <Table
                dataSource={
                  module === "diseases"
                    ? information?.products || []
                    : module === "products"
                    ? information.diceases || []
                    : []
                }
                columns={diceasesColumns}
                pagination={{ position: ["bottomCenter"] }}
                locale={{
                  emptyText: <Empty description="No Data Available" />,
                }}
              />
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default DetailPage;
