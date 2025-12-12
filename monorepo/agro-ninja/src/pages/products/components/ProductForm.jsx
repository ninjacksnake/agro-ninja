import React, { useEffect, useState } from "react";
import { 
    Button, 
    Form, 
    Input, 
    notification, 
    Select,
    Card,
    Row,
    Col,
    Typography,
    Space,
    Divider,
    Spin,
    message
} from "antd";
import { 
    PlusOutlined,
    SaveOutlined,
    CloseOutlined,
    ShoppingOutlined,
    FileTextOutlined,
    AppstoreOutlined,
    ExperimentOutlined,
    BugOutlined,
    EnvironmentOutlined,
    MedicineBoxOutlined,
    PictureOutlined,
    LoadingOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CategoryService from "../../../services/CategoriesService";
import ChemicalService from "../../../services/Chemical.service";
import DiseaseService from "../../../services/Disease.service";
import ProductService from "../../../services/Product.service";
import AddCategoryDrawer from "./AddCategoryDrawer";
import AddComponentDrawer from "./AddComponentDrawer";
import AddDiceaseDrawer from "./AddDiceaseDrawer";
import ImageUploaderFB from "../../components/ImageUploaderFB";
import appConfig from "../../../app.config";
import CropService from "../../../services/Crop.service";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const noPhoto = "no-photo.png";

const ProductForm = ({id}) => {
  const [form] = Form.useForm();
  const [components, setComponents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [crops, setCrops] = useState([]);
  const [diceases, setDiceases] = useState([]);
  const [fileName, setFileName] = useState("");
  const [openCCDrawer, setOpenCCDrawer] = useState(false);
  const [openCChemicalDrawer, setOpenCChemicalDrawer] = useState(false);
  const [openDiceaseDrawer, setOpenDiceaseDrawer] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // open drawer functions
  const openCatDrawer = () => {
    setOpenCCDrawer(true);
  };
  // close drawer cat
  const onCloseCatDrawer = () => {
    setOpenCCDrawer(false);
  };

  const openChemDrawer = () => {
    setOpenCChemicalDrawer(true);
  };
  const onCloseChemDrawer = () => {
    setOpenCChemicalDrawer(false);
  };
  const openDicDrawer = () => {
    setOpenDiceaseDrawer(true);
  };

  const onCloseDiceaseDrawer = () => {
    setOpenDiceaseDrawer(false);
  };



  // notification functions
  const openNotification = (title, body, type = "success") => {
    notification[type === "error" ? "error" : "success"]({
      message: title,
      description: body,
      placement: "topRight",
      duration: 4,
    });
  };

  const clearForm = () => {
    form.resetFields();
  };


  // function to add to list
  const addToList = (listName, values) => {
    // console.log(selector, values);
    try {
      if (listName === "cat") {
        setCategories([...categories, values]);
      } else if (listName === "comp") {
        setComponents([...components, values]);
      } else if (listName === "dic") {
        setDiceases([...diceases, values]);
      }else if (listName === "crop"){
        setCrops([...crops, values])
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get info from db
  useEffect(() => {
    const getInfo = async () => {
      setLoading(true);
      try {
        const [dbChemicals, dbCategories, dbdiceases, dbCrops] = await Promise.all([
          ChemicalService.findAll(),
          CategoryService.FindAll(),
          DiseaseService.findAll(),
          CropService.findAll()
        ]);
        setComponents(dbChemicals);
        setCategories(dbCategories);
        setDiceases(dbdiceases);
        setCrops(dbCrops);
      } catch (error) {
        console.error(error);
        message.error('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
    getInfo();
  }, []);

  // function to finish the form
  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      values.photo = fileName || noPhoto;
      const result = await ProductService.createProduct(values);
      openNotification("Éxito", "El producto ha sido creado satisfactoriamente", "success");
      setTimeout(() => {
        navigate(`/products/details/${result.id}`, { state: result });
      }, 1000);
    } catch (error) {
      console.error(error);
      openNotification(
        "Error",
        "Error al crear el producto. Por favor, intente nuevamente.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // function to reset the form
  const onCancel = () => {
    navigate('/products/find');
  }

  const handleImageUpload = (url) => {
    if (typeof url === "object") {
      url = url.file?.name || url;
    }
    setFileName(url);
    form.setFieldValue("photo", url);
  };  

  const module = appConfig.modules.products;

  //component ui
  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Card
            bordered={false}
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '8px',
            }}
          >
            <div style={{ marginBottom: 24 }}>
              <Title level={2} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                <ShoppingOutlined style={{ color: '#1890ff' }} />
                Crear Nuevo Producto
              </Title>
              <Text type="secondary">
                Complete el formulario para crear un nuevo producto. Todos los campos marcados con * son obligatorios.
              </Text>
            </div>

            <Divider />

            <Spin spinning={loading} tip="Cargando datos...">
              <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                size="large"
              >
                <Row gutter={24}>
                  {/* Image Upload Section */}
                  <Col xs={24} md={24}>
                    <Card
                      size="small"
                      style={{
                        marginBottom: 24,
                        background: '#fafafa',
                        border: '1px dashed #d9d9d9'
                      }}
                    >
                      <Form.Item 
                        name="photo" 
                        label={
                          <span>
                            <PictureOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                            Imagen del Producto
                          </span>
                        }
                        rules={[{ required: false }]}
                      >
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <ImageUploaderFB setFileName={handleImageUpload} module={module} />
                        </div>
                      </Form.Item>
                      <Form.Item name="photo" hidden>
                        <Input value={fileName} />
                      </Form.Item>
                    </Card>
                  </Col>

                  {/* Basic Information */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="name"
                      label={
                        <span>
                          <ShoppingOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                          Nombre <Text type="danger">*</Text>
                        </span>
                      }
                      rules={[
                        { required: true, message: "El nombre es obligatorio" },
                        { min: 2, message: "El nombre debe tener al menos 2 caracteres" }
                      ]}
                    >
                      <Input 
                        placeholder="Ingrese el nombre del producto"
                        prefix={<ShoppingOutlined style={{ color: '#bfbfbf' }} />}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      name="categoryId"
                      label={
                        <span>
                          <AppstoreOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                          Categoría
                        </span>
                      }
                      extra={
                        <Button
                          type="link"
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={openCatDrawer}
                          style={{ padding: 0 }}
                        >
                          Agregar categoría
                        </Button>
                      }
                    >
                      <Select
                        placeholder="Seleccione una categoría"
                        allowClear
                        showSearch
                        filterOption={(input, option) =>
                          (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                      >
                        {categories.map((category) => (
                          <Option value={category.id} key={category.id}>
                            {category.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item
                      name="description"
                      label={
                        <span>
                          <FileTextOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                          Descripción <Text type="danger">*</Text>
                        </span>
                      }
                      rules={[
                        { required: true, message: "La descripción es obligatoria" },
                        { min: 10, message: "La descripción debe tener al menos 10 caracteres" }
                      ]}
                    >
                      <TextArea
                        rows={4}
                        placeholder="Ingrese una descripción detallada del producto"
                        showCount
                        maxLength={500}
                      />
                    </Form.Item>
                  </Col>

                  {/* Components Section */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="chemicals"
                      label={
                        <span>
                          <ExperimentOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                          Componentes Químicos <Text type="danger">*</Text>
                        </span>
                      }
                      rules={[
                        { required: true, message: "Debe seleccionar al menos un componente" },
                      ]}
                      extra={
                        <Button
                          type="link"
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={openChemDrawer}
                          style={{ padding: 0 }}
                        >
                          Agregar componente
                        </Button>
                      }
                    >
                      <Select
                        mode="multiple"
                        placeholder="Seleccione componentes químicos"
                        allowClear
                        showSearch
                        filterOption={(input, option) =>
                          (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                      >
                        {components.map((chemical) => (
                          <Option value={chemical.name} key={chemical.id}>
                            {chemical.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* Diseases Section */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="diceases"
                      label={
                        <span>
                          <BugOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                          Enfermedades <Text type="danger">*</Text>
                        </span>
                      }
                      rules={[
                        { required: true, message: "Debe seleccionar al menos una enfermedad" },
                      ]}
                      extra={
                        <Button
                          type="link"
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={openDicDrawer}
                          style={{ padding: 0 }}
                        >
                          Agregar enfermedad
                        </Button>
                      }
                    >
                      <Select
                        mode="multiple"
                        placeholder="Seleccione enfermedades"
                        allowClear
                        showSearch
                        filterOption={(input, option) =>
                          (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                      >
                        {diceases.map((dicease) => (
                          <Option value={dicease.name} key={dicease.id}>
                            {dicease.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* Crops Section */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="crops"
                      label={
                        <span>
                          <EnvironmentOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                          Cultivos
                        </span>
                      }
                    >
                      <Select
                        mode="multiple"
                        placeholder="Seleccione cultivos relacionados"
                        allowClear
                        showSearch
                        filterOption={(input, option) =>
                          (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                      >
                        {crops.map((crop) => (
                          <Option value={crop.id} key={crop.id}>
                            {crop.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* Dosage Section */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="dossage"
                      label={
                        <span>
                          <MedicineBoxOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                          Dosificación Recomendada <Text type="danger">*</Text>
                        </span>
                      }
                      rules={[
                        { required: true, message: "La dosificación es obligatoria" },
                      ]}
                    >
                      <Input placeholder="Ej: 500ml/H" />
                    </Form.Item>
                  </Col>
                </Row>

                <Divider />

                {/* Action Buttons */}
                <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                  <Space size="large" style={{ width: '100%', justifyContent: 'flex-end' }}>
                    <Button
                      size="large"
                      icon={<CloseOutlined />}
                      onClick={onCancel}
                      disabled={submitting}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                      icon={<SaveOutlined />}
                      loading={submitting}
                      style={{
                        minWidth: 140,
                        background: '#1890ff',
                        borderColor: '#1890ff'
                      }}
                    >
                      {submitting ? 'Guardando...' : 'Crear Producto'}
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Spin>
          </Card>
        </Col>
      </Row>
      <AddCategoryDrawer
        open={openCCDrawer}
        onClose={onCloseCatDrawer}
        openNotification={openNotification}
        addCatOrComp={addToList}
      />
      <AddComponentDrawer
        open={openCChemicalDrawer}
        onClose={onCloseChemDrawer}
        addCatOrComp={addToList}
        openNotification={openNotification}
      />
      <AddDiceaseDrawer
        open={openDiceaseDrawer}
        onClose={onCloseDiceaseDrawer}
        addCatOrComp={addToList}
        openNotification={openNotification}
      />
    </div>
  );
};

export default ProductForm;
