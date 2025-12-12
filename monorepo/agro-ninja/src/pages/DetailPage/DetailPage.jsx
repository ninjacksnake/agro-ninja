import { Alert, Card, Col, Divider, Empty, Row, Spin, Table, Image, Breadcrumb, Typography, Tag, Button, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  FileTextOutlined,
  ExperimentOutlined,
  BugOutlined,
  KeyOutlined,
  TagOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import ChemicalService from "../../services/Chemical.service";
import DiseaseService from "../../services/Disease.service";
import ProductService from "../../services/Product.service";
import ImageViewer from "../components/ImageViewer";
import AppConfig from "../../app.config";
import "./DetailPage.css";

import noPhoto from "../../assets/images/no-photos.png"
import CropService from "../../services/Crop.service";



const urlEndpoint = AppConfig.apiUrl;
const uploadPath = AppConfig.uploadPath;

// Module configuration for better UX
const moduleConfig = {
  products: {
    title: "Producto",
    icon: <ExperimentOutlined />,
    color: "blue",
    route: "/products"
  },
  diseases: {
    title: "Enfermedad",
    icon: <BugOutlined />,
    color: "red",
    route: "/diseases"
  },
  chemicals: {
    title: "Químico",
    icon: <ExperimentOutlined />,
    color: "green",
    route: "/chemicals"
  },
  crops: {
    title: "Cultivo",
    icon: <KeyOutlined />,
    color: "orange",
    route: "/crops"
  }
};

// Import column models
const DetailsTableModels = {
  chemicalsColumns: [
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
  ],
  diseasesColumns: [
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
  ],
  cropsColumns: [
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
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
    },
  ],
  productsColumns: [
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
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
    },
  ],
};

function getPhoto( urlEndpoint, uploadPath, module, photo){
   console.log(urlEndpoint, uploadPath, module, photo )
  if (photo){
    return `${urlEndpoint}${uploadPath}/${module}/${photo}`;
  }else{
    return noPhoto;
  }
}

// Helper function to get breadcrumb items
const getBreadcrumbItems = (module, name) => [
  {
    title: <><HomeOutlined /> Inicio</>,
    href: '/',
  },
  {
    title: moduleConfig[module]?.title || module,
    href: moduleConfig[module]?.route || `/${module}`,
  },
  {
    title: name || 'Detalles',
  },
];

// Helper function to render field with icon
const renderField = (icon, label, value, showIfEmpty = false) => {
  if (!value && !showIfEmpty) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
      <span style={{ marginRight: '8px', color: '#1890ff' }}>{icon}</span>
      <Text strong style={{ minWidth: '120px' }}>{label}:</Text>
      <Text style={{ marginLeft: '8px' }}>{value || 'N/A'}</Text>
    </div>
  );
}; 

const { Title, Text, Paragraph } = Typography;

const DetailPage = () => {
  const [information, setInformation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const module = location.pathname.split("/").slice(1)[0];
  const pId = location.pathname.split("/").slice(-1)[0];
  
  useEffect(() => {
    console.log("Module", module);
    console.log("pId", pId);
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (module === "products") {
          data = await ProductService.findById(pId);
        //  console.log(data)
        } else if (module === "diseases") {
          data = await DiseaseService.findById(pId);
          console.log(data)
        } else if (module === "chemicals") {
          data = await ChemicalService.findById(pId);
        } else if (module === "crops"){
          data = await CropService.findById(pId);
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        padding: '20px'
      }}>
        <Spin size="large" />
        <Text style={{ marginTop: '16px', color: '#666' }}>
          Cargando detalles del {moduleConfig[module]?.title?.toLowerCase() || 'elemento'}...
        </Text>
      </div>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }
//console.log('Info',information)
  const currentConfig = moduleConfig[module] || {};

  return (
    <div className="detail-page-container">
      {/* Breadcrumb Navigation */}
      <div style={{ marginBottom: '32px' }}>
        <Breadcrumb items={getBreadcrumbItems(module, information?.name)} />
      </div>

      {/* Header Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            fontSize: '24px',
            color: currentConfig.color || '#1890ff'
          }}>
            {currentConfig.icon}
          </div>
          <div>
            <Title level={2} style={{ margin: 0, color: currentConfig.color || '#1890ff' }}>
              {information?.name}
            </Title>
            <Text type="secondary" style={{ fontSize: '16px' }}>
              Detalle de {currentConfig.title?.toLowerCase()}
            </Text>
          </div>
        </div>

        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(currentConfig.route || `/${module}`)}
          >
            Volver
          </Button>
          {information?.id && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => navigate(`/${module}/update/${information.id}`)}
            >
              Editar
            </Button>
          )}
        </Space>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <Row gutter={{ xs: 16, sm: 24, md: 32, lg: 40 }}>
          <Col xs={24} md={10} lg={8}>
            <Card
              className="photo-card"
              bodyStyle={{ padding: '24px', textAlign: 'center' }}
            >
              <ImageViewer fileName={getPhoto( urlEndpoint, uploadPath, module, information?.photo)} />
            </Card>
          </Col>

          <Col xs={24} md={14} lg={16}>
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <InfoCircleOutlined />
                  Información General
                </div>
              }
              bordered={false}
              className="info-card"
            >
              <div style={{ padding: '8px 0' }}>
                {renderField(<FileTextOutlined />, "Nombre", information?.name)}
                {renderField(<FileTextOutlined />, "Descripción", information?.description)}

                {information?.category?.name && (
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ marginRight: '8px', color: '#1890ff' }}>
                      <TagOutlined />
                    </span>
                    <Text strong style={{ minWidth: '120px' }}>Categoría:</Text>
                    <Tag color="blue" style={{ marginLeft: '8px' }}>
                      {information.category.name}
                    </Tag>
                  </div>
                )}

                {information?.dossage && renderField(<ExperimentOutlined />, "Dosificación", information.dossage)}
                {information?.type && renderField(<TagOutlined />, "Tipo", information.type)}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Row gutter={{ xs: 16, sm: 24, md: 32 }}>
        {module !== "diseases" && (
          <Col xs={24} lg={12}>
            <Card
              title={
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  <div style={{
                    color: '#1890ff',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#e6f7ff',
                    borderRadius: '6px'
                  }}>
                    <ExperimentOutlined />
                  </div>
                  <span style={{ color: '#262626' }}>
                    {module === "chemicals"
                      ? "Productos Relacionados"
                      : module === "products"
                      ? "Componentes"
                      : "Relacionados"}
                  </span>
                </div>
              }
              bordered={false}
              className="table-card"
            >
              <Table
                dataSource={
                  module === "products"
                    ? information?.chemicals || []
                    : module === "chemicals"
                    ? information.products || []
                    : []
                }
                columns={DetailsTableModels.chemicalsColumns}
                pagination={{
                  position: ["bottomCenter"],
                  pageSize: 5,
                  showSizeChanger: false,
                  hideOnSinglePage: true
                }}
                size="middle"
                bordered={false}
                locale={{
                  emptyText: (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                          <Text style={{ color: '#8c8c8c', fontSize: '14px' }}>
                            No hay {module === "chemicals" ? "productos" : "componentes"} relacionados
                          </Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            Los elementos relacionados aparecerán aquí
                          </Text>
                        </div>
                      }
                    />
                  ),
                }}
              />
            </Card>
          </Col>
        )}

        {module !== "chemicals" && (
          <Col xs={24} lg={12}>
            <Card
              title={
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  <div style={{
                    color: '#1890ff',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#e6f7ff',
                    borderRadius: '6px'
                  }}>
                    {module === "diseases" ? <ExperimentOutlined /> : <BugOutlined />}
                  </div>
                  <span style={{ color: '#262626' }}>
                    {module === "diseases"
                      ? "Productos Relacionados"
                      : module === "products"
                      ? "Enfermedades Relacionadas"
                      : "Relacionados"}
                  </span>
                </div>
              }
              bordered={false}
              className="table-card"
            >
              <Table
                dataSource={
                  module === "diseases"
                    ? information?.products || []
                    : module === "products"
                    ? information.diseases || []
                    : []
                }
                columns={DetailsTableModels.diseasesColumns}
                pagination={{
                  position: ["bottomCenter"],
                  pageSize: 5,
                  showSizeChanger: false,
                  hideOnSinglePage: true
                }}
                size="middle"
                bordered={false}
                locale={{
                  emptyText: (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                          <Text style={{ color: '#8c8c8c', fontSize: '14px' }}>
                            No hay {module === "diseases" ? "productos" : "enfermedades"} relacionados
                          </Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            Los elementos relacionados aparecerán aquí
                          </Text>
                        </div>
                      }
                    />
                  ),
                }}
              />
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default DetailPage;
