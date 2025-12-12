import React, { useState, useEffect } from "react";
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
    message
} from "antd";
import { 
    SearchOutlined, 
    PlusOutlined,
    ShoppingOutlined,
    LoadingOutlined
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import ProductService from "../../services/Product.service";
import ProductsTable from "./components/ProductsTable";
import DrawerComponent from "../components/DrawerComponent";

const { Title, Text } = Typography;
const { Search } = Input;



const FindProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtredProducts, setFiltredProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await ProductService.findAll();
        const enhancedData = data.map((product) => ({
          ...product,
          key: product.id,
        }));
        setProducts(enhancedData);
        setFiltredProducts(enhancedData);
      } catch (error) {
        console.error(error);
        message.error('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filterProducts = (value) => {
    setSearchValue(value);
    if (!value || value.trim() === "") {
      setFiltredProducts(products);
      return;
    }
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltredProducts(filteredProducts);
  };

  // const showDrawer = (name) => {
  //   const chosenProduct =
  //     filtredProducts.find((product) => product.name === name) ?? null;
  //   setSelectedProduct((p) => chosenProduct);
  //   setOpen(true);
  // };
  const onClose = () => {
    setOpen(false);
  };

  const getChemicalId = (name) => {
    return selectedProduct?.chemicals?.find((chemical) => chemical.name === name)?.id;
  }

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
                  <ShoppingOutlined style={{ color: '#1890ff' }} />
                  Buscar Productos
                </Title>
                <Tooltip title="Agregar Nuevo Producto">
                  <NavLink to={"/products/add"}>
                    <Button 
                      type="primary" 
                      size="large"
                      icon={<PlusOutlined />}
                      style={{
                        background: '#1890ff',
                        borderColor: '#1890ff'
                      }}
                    >
                      Nuevo Producto
                    </Button>
                  </NavLink>
                </Tooltip>
              </div>
              <Text type="secondary">
                Busque y gestione todos los productos disponibles en el sistema.
              </Text>
            </div>

            <Space.Compact style={{ width: "100%", marginBottom: 24 }}>
              <Search
                placeholder="Buscar producto por nombre..."
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
                value={searchValue}
                onChange={(e) => filterProducts(e.target.value)}
                onSearch={filterProducts}
                style={{ width: '100%' }}
              />
            </Space.Compact>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Spin 
                  size="large" 
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                  tip="Cargando productos..."
                />
              </div>
            ) : filtredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Text type="secondary" style={{ fontSize: 16 }}>
                  {searchValue 
                    ? `No se encontraron productos que coincidan con "${searchValue}"`
                    : 'No hay productos disponibles'
                  }
                </Text>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 16 }}>
                  <Text type="secondary">
                    Mostrando {filtredProducts.length} de {products.length} productos
                  </Text>
                </div>
                <ProductsTable data={filtredProducts} />
              </>
            )}
          </Card>
        </Col>
      </Row>

      <DrawerComponent
        open={open}
        onClose={onClose}
        title={selectedProduct?.name}
        caption={"Componentes Químicos"}
        columns={[
          {
            title: "Nombre",
            dataIndex: "name",
            key: "id",
            render: (text) => (
              <NavLink to={`/chemicals/details/${getChemicalId(text)}`}>
                {text}
              </NavLink>
            ),
          },
        ]}
        data={selectedProduct?.chemicals || []}
      />
    </div>
  );
};

export default FindProducts;
