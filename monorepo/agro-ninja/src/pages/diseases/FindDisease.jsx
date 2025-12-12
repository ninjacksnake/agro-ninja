import React, { useEffect, useState, useMemo } from "react";
import { 
    Input, 
    Space, 
    Button, 
    Tooltip, 
    Card,
    Row,
    Col,
    Typography,
    Spin,
    message,
    notification
} from "antd";
import { 
    SearchOutlined, 
    PlusOutlined,
    BugOutlined,
    LoadingOutlined
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import diseasesService from "../../services/Disease.service";
import TableComponent from "../components/TableComponent";
import DrawerComponent from "../components/DrawerComponent";

const { Title, Text } = Typography;
const { Search } = Input;

const columns = [
  {
    title: 'Nombre',
    key: 'name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  }, 
  {
    title: 'Descripción',
    key: 'description',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    title: 'Tipo',
    key: 'diseaseType',
    dataIndex: ['diseaseType', 'name'],
    render: (text) => text || 'N/A',
  },
];

const FindDisease = () => {
  const [diseases, setDiseases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const result = await diseasesService.findAll();
        const enhancedData = result.map((disease) => ({
          ...disease,
          key: disease.id,
        }));
        setDiseases(enhancedData);
      } catch (error) {
        console.error(error);
        message.error('Error al cargar las enfermedades');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const filteredDiseases = useMemo(() => {
    if (!diseases.length) return [];
    if (!searchTerm || searchTerm.trim() === '') return diseases;
    return diseases.filter((disease) =>
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [diseases, searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value || '');
  };

  const showDrawer = (name) => {
    const chosenDisease = diseases.find((disease) => disease.name === name) ?? null;
    setSelectedDisease(chosenDisease);
    setOpen(true);
  };

  const getProductId = (name) => {
    if (!selectedDisease?.products) return null;
    const product = selectedDisease.products.find((p) => p.name === name);
    return product?.id;
  };

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card
            bordered={false}
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '8px',
            }}
          >
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Title level={2} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <BugOutlined style={{ color: '#1890ff' }} />
                  Buscar Enfermedades
                </Title>
                <Tooltip title="Agregar Nueva Enfermedad">
                  <NavLink to={"/diseases/add"}>
                    <Button 
                      type="primary" 
                      size="large"
                      icon={<PlusOutlined />}
                      style={{
                        background: '#1890ff',
                        borderColor: '#1890ff'
                      }}
                    >
                      Nueva Enfermedad
                    </Button>
                  </NavLink>
                </Tooltip>
              </div>
              <Text type="secondary">
                Busque y gestione todas las enfermedades disponibles en el sistema.
              </Text>
            </div>

            <Space.Compact style={{ width: "100%", marginBottom: 24 }}>
              <Search
                placeholder="Buscar enfermedad por nombre o descripción..."
                allowClear
                enterButton={
                  <Button 
                    type="primary" 
                    icon={<SearchOutlined />}
                    style={{ background: '#1890ff', borderColor: '#1890ff' }}
                  >
                    Buscar
                  </Button>
                }
                size="large"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onSearch={handleSearch}
                style={{ width: '100%' }}
              />
            </Space.Compact>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Spin 
                  size="large" 
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                  tip="Cargando enfermedades..."
                />
              </div>
            ) : filteredDiseases.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Text type="secondary" style={{ fontSize: 16 }}>
                  {searchTerm 
                    ? `No se encontraron enfermedades que coincidan con "${searchTerm}"`
                    : 'No hay enfermedades disponibles'
                  }
                </Text>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 16 }}>
                  <Text type="secondary">
                    Mostrando {filteredDiseases.length} de {diseases.length} enfermedades
                  </Text>
                </div>
                <TableComponent 
                  data={filteredDiseases} 
                  columns={columns} 
                  module={'diseases'} 
                  showDrawer={showDrawer}
                  loading={loading}
                />
              </>
            )}
          </Card>
        </Col>
      </Row>

      <DrawerComponent
        caption={'Productos Relacionados'}
        open={open}
        onClose={() => setOpen(false)}
        title={selectedDisease?.name}
        columns={[
          {
            title: 'Nombre',
            key: 'name',
            dataIndex: 'name',
            render: (text) => {
              const id = getProductId(text);
              return id ? (
                <NavLink to={`/products/details/${id}`}>
                  {text}
                </NavLink>
              ) : text;
            }
          },
          {
            title: 'Descripción',
            key: 'description',
            dataIndex: 'description',
            ellipsis: true,
          },
        ]}
        data={selectedDisease?.products || []}
      />
    </div>
  );
};

export default FindDisease;
