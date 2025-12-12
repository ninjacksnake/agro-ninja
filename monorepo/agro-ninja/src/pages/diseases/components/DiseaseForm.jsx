import React, { useEffect, useState } from "react";
import { 
    Button, 
    Form, 
    Input, 
    notification, 
    Select,
    Divider,
    Card,
    Row,
    Col,
    Typography,
    Space,
    Spin,
    message,
    Modal
} from "antd";
import { 
    PlusOutlined,
    SaveOutlined,
    CloseOutlined,
    BugOutlined,
    FileTextOutlined,
    AppstoreOutlined,
    PictureOutlined,
    LoadingOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import appConfig from "../../../app.config";
import diseaseService from "../../../services/Disease.service";
import DiseaseTypeService from "../../../services/DiseaseType.service";
import ImageUploaderFB from "../../components/ImageUploaderFB";

const { Title, Text } = Typography;
const { TextArea } = Input;
const noPhoto = "no-photo.png";
const module = appConfig.modules.diseases;

const DiseaseForm = ({ isUpdate, id }) => {
  const [form] = Form.useForm();
  const [fileName, setFileName] = useState("");
  const [disease, setDisease] = useState({});
  const [diseaseTypeModal, setDiseaseTypeModal] = useState(false);
  const [diseaseType, setDiseaseType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fetchingTypes, setFetchingTypes] = useState(true);
  const navigate = useNavigate();

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
    setFileName("");
  };

  useEffect(() => {
    const getInfo = async () => {
      setFetchingTypes(true);
      try {
        const response = await DiseaseTypeService.findAll();
        setDiseaseType(response.map(type => ({
          value: type.id,
          label: type.name
        })));
      } catch (error) {
        console.error(error);
        message.error('Error al cargar los tipos de enfermedades');
      } finally {
        setFetchingTypes(false);
      }
    };
    getInfo();
  }, []);

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      values.photo = fileName || noPhoto;
      const result = await diseaseService.create(values);
      openNotification("Éxito", "La enfermedad ha sido creada satisfactoriamente", "success");
      setTimeout(() => {
        navigate(`/diseases/details/${result.id}`);
      }, 1000);
    } catch (error) {
      console.error(error);
      openNotification(
        "Error",
        "Error al crear la enfermedad. Por favor, intente nuevamente.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const onCancel = () => {
    if (isUpdate) {
      navigate('/diseases/find');
    } else {
      clearForm();
    }
  };

  const handleAddDiseaseType = async (values) => {
    try {
      const newType = await DiseaseTypeService.create({ 
        name: values.diseaseType,
        description: values.diseaseType || values.diseaseType
      });
      setDiseaseType([...diseaseType, {
        value: newType.id,
        label: newType.name
      }]);
      setDiseaseTypeModal(false);
      message.success('Tipo de enfermedad agregado exitosamente');
      // Update the form field to select the newly created type
      form.setFieldValue('diseaseTypeId', newType.id);
    } catch (error) {
      console.error(error);
      message.error('Error al crear el tipo de enfermedad');
    }
  };

  const handleImageUpload = (url) => {
    if (typeof url === "object") {
      url = url.file?.name || url;
    }
    setFileName(url);
    form.setFieldValue("photo", url);
  };

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
                <BugOutlined style={{ color: '#1890ff' }} />
                {isUpdate ? 'Actualizar Enfermedad' : 'Crear Nueva Enfermedad'}
              </Title>
              <Text type="secondary">
                {isUpdate 
                  ? 'Modifica la información de la enfermedad. Todos los campos marcados con * son obligatorios.'
                  : 'Complete el formulario para crear una nueva enfermedad. Todos los campos marcados con * son obligatorios.'
                }
              </Text>
            </div>

            <Divider />

            <Spin spinning={fetchingTypes} tip="Cargando tipos de enfermedades...">
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
                            Imagen de la Enfermedad
                          </span>
                        }
                        rules={[{ required: false }]}
                      >
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <ImageUploaderFB
                            setFileName={handleImageUpload}
                            module={module}
                          />
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
                          <BugOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                          Nombre <Text type="danger">*</Text>
                        </span>
                      }
                      rules={[
                        { required: true, message: "El nombre es obligatorio" },
                        { min: 2, message: "El nombre debe tener al menos 2 caracteres" }
                      ]}
                    >
                      <Input 
                        placeholder="Ingrese el nombre de la enfermedad"
                        prefix={<BugOutlined style={{ color: '#bfbfbf' }} />}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      name="diseaseTypeId"
                      label={
                        <span>
                          <AppstoreOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                          Clasificación <Text type="danger">*</Text>
                        </span>
                      }
                      rules={[
                        { required: true, message: "Debe seleccionar una clasificación" }
                      ]}
                      extra={
                        <Button
                          type="link"
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={() => setDiseaseTypeModal(true)}
                          style={{ padding: 0 }}
                        >
                          Agregar clasificación
                        </Button>
                      }
                    >
                      <Select
                        placeholder="Seleccione una clasificación"
                        options={diseaseType}
                        allowClear
                        showSearch
                        loading={fetchingTypes}
                        filterOption={(input, option) =>
                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        notFoundContent={
                          fetchingTypes ? (
                            <Spin size="small" />
                          ) : (
                            <Text type="secondary">No se encontraron clasificaciones</Text>
                          )
                        }
                      />
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
                        placeholder="Ingrese una descripción detallada de la enfermedad"
                        showCount
                        maxLength={500}
                      />
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
                      icon={isUpdate ? <SaveOutlined /> : <PlusOutlined />}
                      loading={submitting}
                      style={{
                        minWidth: 140,
                        background: '#1890ff',
                        borderColor: '#1890ff'
                      }}
                    >
                      {submitting 
                        ? 'Guardando...' 
                        : isUpdate 
                          ? 'Actualizar' 
                          : 'Crear Enfermedad'
                      }
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Spin>
          </Card>
        </Col>
      </Row>

      {/* Disease Type Modal */}
      <Modal
        title="Agregar Clasificación"
        open={diseaseTypeModal}
        onCancel={() => setDiseaseTypeModal(false)}
        footer={null}
      >
        <Form onFinish={handleAddDiseaseType}>
          <Form.Item
            name="diseaseType"
            label="Clasificación"
            rules={[{ required: true, message: 'Por favor ingrese el nombre de la clasificación' }]}
          >
            <Input placeholder="Nombre de la clasificación" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Agregar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DiseaseForm;
