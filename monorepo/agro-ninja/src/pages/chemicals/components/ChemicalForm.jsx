import { 
    Button, 
    Form, 
    Input, 
    Select, 
    notification,
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
    ExperimentOutlined,
    FileTextOutlined,
    AppstoreOutlined,
    PictureOutlined,
    SaveOutlined,
    CloseOutlined,
    PlusOutlined,
    LoadingOutlined
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChemicalService from "../../../services/Chemical.service.jsx";
import ImageUploaderFB from "../../components/ImageUploaderFB.jsx";
import appConfig from "../../../app.config.js";
import chemicalTypesService from "../../../services/ChemicalTypes.service.jsx";

const { Title, Text } = Typography;
const { TextArea } = Input;
const noPhoto = "no-photo.png";

const module = appConfig.modules.chemicals;

const ChemicalForm = ({
  isUpdate,
  id = null,
  addCatOrComp = null,
  onClose = null,
  isFromDrawer = false,
}) => {
  const [form] = Form.useForm();
  const [fileName, setFilename] = useState("");
  const [chemical, setChemical] = useState({});
  const [chemicalTypes, setChemicalTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fetchingTypes, setFetchingTypes] = useState(true);

  const navigate = useNavigate();

  const clearForm = () => {
    form.resetFields();
    setFilename("");
  };

  const openNotification = (title, body, type = "success") => {
    notification[type === "error" ? "error" : "success"]({
      message: title,
      description: body,
      placement: "topRight",
      duration: 4,
    });
  };

  // Function to component load
  useEffect(() => {
    const fetchData = async () => {
      setFetchingTypes(true);
      
      if (isUpdate && id) {
        setLoading(true);
        try {
          const result = await ChemicalService.findById(id);
          setChemical(result);
          setFilename(result.photo || "");
          form.setFieldsValue({
            name: result.name || "",
            photo: result.photo || "",
            description: result.description || "",
            chemicalTypeId: result.chemicalType?.id || "",
          });
        } catch (error) {
          console.error(error);
          message.error('Error al cargar los datos del químico');
        } finally {
          setLoading(false);
        }
      }

      try {
        const result = await chemicalTypesService.getAll();
        setChemicalTypes(result.map(type => ({
          label: type.name,
          value: type.id
        })));
      } catch (error) {
        console.error(error);
        message.error('Error al cargar los tipos de químicos');
      } finally {
        setFetchingTypes(false);
      }
    };

    fetchData();
  }, [isUpdate, id, form]);


  // Function to handle the form submission
  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      if (isUpdate) {
        values.photo = fileName || chemical.photo;
        values.id = chemical.id;
        await ChemicalService.updateChemical(values);
        openNotification(
          "Éxito",
          "El químico ha sido actualizado satisfactoriamente",
          "success"
        );
        if (isFromDrawer) {
          onClose?.();
        } else {
          setTimeout(() => {
            navigate(`/chemicals/details/${chemical.id}`);
          }, 1000);
        }
      } else {
        values.photo = fileName || noPhoto;
        const result = await ChemicalService.createChemical(values);
        openNotification(
          "Éxito",
          "El químico ha sido creado satisfactoriamente",
          "success"
        );
        if (addCatOrComp) {
          addCatOrComp("comp", values);
          clearForm();
          onClose?.();
        } else if (isFromDrawer) {
          onClose?.();
        } else {
          setTimeout(() => {
            navigate(`/chemicals/details/${result.id}`);
          }, 1000);
        }
      }
    } catch (error) {
      console.error(error);
      openNotification(
        "Error",
        isUpdate
          ? "Error al actualizar el químico. Por favor, intente nuevamente."
          : "Error al crear el químico. Por favor, intente nuevamente.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const onCancel = () => {
    if (isUpdate) {
      navigate('/chemicals');
    } else {
      if (isFromDrawer) {
        onClose?.();
      } else {
        clearForm();
      }
    }
  }

  // Render form content
  const renderFormContent = () => (
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
                  Imagen del Químico
                </span>
              }
            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ImageUploaderFB
                  setFileName={setFilename}
                  module={module}
                />
              </div>
            </Form.Item>
            <Form.Item name="photo" hidden>
              <Input value={fileName} />
            </Form.Item>
          </Card>
        </Col>

        {/* Form Fields */}
        <Col xs={24} md={12}>
          <Form.Item
            name="name"
            label={
              <span>
                <ExperimentOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                Nombre <Text type="danger">*</Text>
              </span>
            }
            rules={[
              { required: true, message: "El nombre es obligatorio" },
              { min: 2, message: "El nombre debe tener al menos 2 caracteres" }
            ]}
          >
            <Input 
              placeholder="Ingrese el nombre del químico"
              prefix={<ExperimentOutlined style={{ color: '#bfbfbf' }} />}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="chemicalTypeId"
            label={
              <span>
                <AppstoreOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                Tipo de Químico <Text type="danger">*</Text>
              </span>
            }
            rules={[
              { required: true, message: "Debe seleccionar un tipo" }
            ]}
          >
            <Select
              placeholder="Seleccione el tipo de químico"
              options={chemicalTypes}
              showSearch
              loading={fetchingTypes}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              notFoundContent={
                fetchingTypes ? (
                  <Spin size="small" />
                ) : (
                  <Text type="secondary">No se encontraron tipos</Text>
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
              placeholder="Ingrese una descripción detallada del químico"
              showCount
              maxLength={500}
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider />

      {/* Action Buttons */}
      <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
        <Space size="large" style={{ width: '100%', justifyContent: isFromDrawer ? 'flex-end' : 'flex-end' }}>
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
                : 'Crear Químico'
            }
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );

  // If used in drawer, render simple form
  if (isFromDrawer) {
    return (
      <Spin spinning={loading || fetchingTypes} tip="Cargando...">
        {renderFormContent()}
      </Spin>
    );
  }

  // Full page layout
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
                <ExperimentOutlined style={{ color: '#1890ff' }} />
                {isUpdate ? 'Actualizar Químico' : 'Crear Nuevo Químico'}
              </Title>
              <Text type="secondary">
                {isUpdate 
                  ? 'Modifica la información del químico. Todos los campos marcados con * son obligatorios.'
                  : 'Complete el formulario para crear un nuevo químico. Todos los campos marcados con * son obligatorios.'
                }
              </Text>
            </div>

            <Divider />

            <Spin spinning={loading || fetchingTypes} tip="Cargando datos...">
              {renderFormContent()}
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChemicalForm;
