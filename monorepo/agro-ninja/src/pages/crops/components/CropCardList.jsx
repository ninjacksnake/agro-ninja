import React, { useState } from "react";
import {
    List,
    Drawer,
    Table,
    Typography,
    Image,
    Tag,
    Space,
    Divider,
    Empty,
    Card,
    Row,
    Col,
    Button,
    message
} from "antd";
import {
    EnvironmentOutlined,
    FileTextOutlined,
    EyeOutlined,
    CloseOutlined,
    AppstoreOutlined
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import config from "../../../app.config.js";
import CropCard from "./CropCard";

const { Title, Text, Paragraph } = Typography;
const urlEndpoint = config.apiUrl;
const uploadPath = config.uploadPath;
const module = config.modules.crops;
const noPhoto = "no-photo.png";


const CropCardList = ({ crops }) => {
  const [open, setOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);

  const showDrawer = (cropId) => {
    if (!cropId) {
      message.error('No se pudo encontrar el cultivo seleccionado');
      return;
    }

    const chosenCrop = crops.find(crop => crop.id === cropId);
    if (!chosenCrop) {
      message.error('Cultivo no encontrado');
      return;
    }

    setSelectedCrop(chosenCrop);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedCrop(null);
  };

  // Table columns for crop details
  const columns = [
    {
      title: 'Componente',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <NavLink to={`/chemicals/find`} style={{ color: '#1890ff' }}>
          {text || 'Sin nombre'}
        </NavLink>
      )
    },
    {
      title: 'Tipo',
      dataIndex: 'chemicalType',
      key: 'chemicalType',
      render: (chemicalType) => (
        <Tag color="blue">
          {chemicalType?.name || 'Sin tipo'}
        </Tag>
      )
    }
  ];

  if (!crops || crops.length === 0) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <div>
            <Title level={4} style={{ marginBottom: 8 }}>
              No hay cultivos disponibles
            </Title>
            <Text type="secondary">
              Aún no se han registrado cultivos en el sistema.
            </Text>
          </div>
        }
      />
    );
  }

  return (
    <>
      <List
        grid={{
          gutter: 24,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 5
        }}
        dataSource={crops}
        renderItem={(crop) => (
          <List.Item>
            <CropCard crop={crop} showDrawer={showDrawer} />
          </List.Item>
        )}
      />

      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <EnvironmentOutlined style={{ color: '#1890ff' }} />
            <span>{selectedCrop?.name || 'Detalles del Cultivo'}</span>
          </div>
        }
        placement="right"
        onClose={onClose}
        open={open}
        width={600}
        extra={
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
            style={{ border: 'none', boxShadow: 'none' }}
          />
        }
      >
        {selectedCrop && (
          <div>
            {/* Crop Image and Basic Info */}
            <Card
              style={{
                marginBottom: 24,
                border: '1px solid #f0f0f0',
                borderRadius: '8px'
              }}
            >
              <Row gutter={16} align="middle">
                <Col xs={24} sm={8}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 16
                  }}>
                    <Image
                      src={
                        selectedCrop.photo && selectedCrop.photo !== noPhoto
                          ? `${urlEndpoint}/upload${module}/${selectedCrop.photo}`
                          : `${urlEndpoint}/upload/no-photo`
                      }
                      alt={selectedCrop.name}
                      style={{
                        maxWidth: '100%',
                        maxHeight: 120,
                        objectFit: 'cover',
                        borderRadius: '6px'
                      }}
                      fallback={`${urlEndpoint}/upload/no-photo`}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={16}>
                  <Title level={4} style={{ marginBottom: 12 }}>
                    {selectedCrop.name}
                  </Title>

                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <div>
                      <Text strong style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <AppstoreOutlined />
                        Clasificación:
                      </Text>
                      <Tag color="geekblue" style={{ marginLeft: 6 }}>
                        {selectedCrop.cropType?.name || 'Sin clasificar'}
                      </Tag>
                    </div>

                    <div>
                      <Text strong style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <FileTextOutlined />
                        Descripción:
                      </Text>
                      <Paragraph
                        style={{
                          marginLeft: 20,
                          marginTop: 4,
                          color: '#666'
                        }}
                        ellipsis={{ rows: 3, expandable: true, symbol: 'más' }}
                      >
                        {selectedCrop.description || 'Sin descripción disponible'}
                      </Paragraph>
                    </div>
                  </Space>
                </Col>
              </Row>
            </Card>

            {/* Components Section */}
            <Card
              title={
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <EnvironmentOutlined />
                  Componentes Químicos
                </span>
              }
              style={{
                border: '1px solid #f0f0f0',
                borderRadius: '8px'
              }}
            >
              {selectedCrop.components && selectedCrop.components.length > 0 ? (
                <Table
                  dataSource={selectedCrop.components}
                  columns={columns}
                  pagination={selectedCrop.components.length > 10 ? { pageSize: 10 } : false}
                  size="small"
                  rowKey="id"
                />
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Este cultivo no tiene componentes químicos registrados"
                />
              )}
            </Card>

            {/* Action Buttons */}
            <Divider />
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 12,
              paddingTop: 16
            }}>
              <Button onClick={onClose}>
                Cerrar
              </Button>
              <Button
                type="primary"
                icon={<EyeOutlined />}
                onClick={() => {
                  onClose();
                  // Navigate to crop details if available
                  window.location.href = `/crops/details/${selectedCrop.id}`;
                }}
              >
                Ver Detalles Completos
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default CropCardList;
