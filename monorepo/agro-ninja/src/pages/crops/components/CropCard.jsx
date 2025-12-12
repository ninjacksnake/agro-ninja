import React from "react";
import {
    Card,
    Image,
    Typography,
    Button,
    Space,
    Tooltip,
    message
} from "antd";
import {
    EditOutlined,
    EyeOutlined,
    EnvironmentOutlined,
    FileTextOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import config from "../../../app.config.js";

const { Title, Text, Paragraph } = Typography;
const urlEndpoint = config.apiUrl;
const uploadPath = config.uploadPath;
const module = config.modules.crops;
const noPhoto = "no-photo.png";

const CropCard = ({ crop, showDrawer }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    if (!crop?.id) {
      message.error('No se pudo encontrar el cultivo para editar');
      return;
    }
    navigate(`/crops/update/${crop.id}`);
  };

  const handleViewDetails = () => {
    if (!crop?.id) {
      message.error('No se pudo encontrar el cultivo para ver detalles');
      return;
    }
    navigate(`/crops/details/${crop.id}`);
  };

  if (!crop) {
    return (
      <Card
        style={{
          height: 350,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed #d9d9d9'
        }}
      >
        <Text type="secondary">Cultivo no disponible</Text>
      </Card>
    );
  }

  const imageUrl = crop.photo && crop.photo !== noPhoto
    ? `${urlEndpoint}/upload${module}/${crop.photo}`
    : `${urlEndpoint}/upload/no-photo`;

  return (
    <Card
      hoverable
      style={{
        height: 350,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        border: '1px solid #f0f0f0'
      }}
      cover={
        <div style={{
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fafafa',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <Image
            src={imageUrl}
            alt={crop.name || 'Imagen del cultivo'}
            style={{
              maxHeight: '140px',
              maxWidth: '140px',
              objectFit: 'cover',
              borderRadius: '4px'
            }}
            placeholder={
              <div style={{
                height: 140,
                width: 140,
                background: '#f0f0f0',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <EnvironmentOutlined style={{ fontSize: '24px', color: '#bfbfbf' }} />
              </div>
            }
            fallback={`${urlEndpoint}/upload/no-photo`}
          />
        </div>
      }
      actions={[
        <Tooltip title="Ver detalles" key="view">
          <Button
            type="text"
            icon={<EyeOutlined style={{ color: '#1890ff' }} />}
            onClick={handleViewDetails}
            style={{
              border: 'none',
              boxShadow: 'none',
              background: 'transparent'
            }}
          />
        </Tooltip>,
        <Tooltip title="Editar cultivo" key="edit">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#52c41a' }} />}
            onClick={handleEdit}
            style={{
              border: 'none',
              boxShadow: 'none',
              background: 'transparent'
            }}
          />
        </Tooltip>
      ]}
    >
      <div style={{ padding: '16px 0' }}>
        <Title
          level={5}
          style={{
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
          ellipsis={{ rows: 1, tooltip: crop.name }}
        >
          <EnvironmentOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
          {crop.name || 'Sin nombre'}
        </Title>

        <div style={{ marginBottom: 12 }}>
          <Text
            type="secondary"
            style={{
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <FileTextOutlined />
            Clasificación
          </Text>
          <Text strong style={{ display: 'block', marginTop: 2 }}>
            {crop.cropType?.name || crop.cropTypeId || 'Sin clasificar'}
          </Text>
        </div>

        <Paragraph
          ellipsis={{ rows: 2, tooltip: crop.description }}
          style={{
            margin: 0,
            fontSize: '14px',
            lineHeight: '1.5',
            color: '#666'
          }}
        >
          {crop.description || 'Sin descripción disponible'}
        </Paragraph>
      </div>
    </Card>
  );
};

export default CropCard;
