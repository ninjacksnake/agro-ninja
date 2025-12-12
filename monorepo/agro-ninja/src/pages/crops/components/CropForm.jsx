import React, { useEffect, useState, useMemo } from "react";
import {
    Button,
    Form,
    Input,
    notification,
    Select,
    Modal,
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
    EnvironmentOutlined,
    FileTextOutlined,
    AppstoreOutlined,
    ExperimentOutlined,
    BugOutlined,
    MedicineBoxOutlined,
    PictureOutlined,
    LoadingOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import appConfig from "../../../app.config";
import CropService from "../../../services/Crop.service.jsx";
import CropTypeService from "../../../services/CropType.service.jsx";
import ProductService from "../../../services/Product.service.jsx";
import DiseaseService from "../../../services/Disease.service.jsx";
import ImageUploaderFB from "../../components/ImageUploaderFB";

const { Title, Text } = Typography;
const { TextArea } = Input;
const module = appConfig.modules.crops;
const noPhoto = "no-photo.png";

const CropForm = ({ isUpdate, id }) => {
    const [form] = Form.useForm();
    const [cropToUpdate, setCropToUpdate] = useState(null);
    const [fileName, setFileName] = useState("");
    const [products, setProducts] = useState([]);
    const [cropTypes, setCropTypes] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [cropTypeModalVisible, setCropTypeModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const memoizedCropTypes = useMemo(() => cropTypes.map((cropType, index) => ({
        value: cropType.id,
        label: cropType.name,
    })), [cropTypes]);

    const memoizedProducts = useMemo(() => products.map((product, index) => ({
        value: product.id,
        label: product.name,
    })), [products]);

    const memoizedDiseases = useMemo(() => diseases.map((disease, index) => ({
        value: disease.id,
        label: disease.name,
    })), [diseases]);


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
            setLoading(true);
            try {
                // Load crop data if updating
                if (isUpdate && id) {
                    const cropData = await CropService.findById(id);
                    setCropToUpdate(cropData);
                    setFileName(cropData.photo || "");
                    form.setFieldsValue({
                        name: cropData.name,
                        description: cropData.description,
                        type: cropData.cropTypeId,
                        diseases: cropData.diseases?.map(d => d.id) || [],
                        products: cropData.products?.map(p => p.id) || [],
                        photo: cropData.photo
                    });
                }

                // Load related data
                const [cropTypesData, productsData, diseasesData] = await Promise.all([
                    CropTypeService.getAll(),
                    ProductService.findAll(),
                    DiseaseService.findAll(),
                ]);

                setCropTypes(cropTypesData);
                setProducts(productsData);
                setDiseases(diseasesData);

            } catch (error) {
                console.error(error);
                message.error('Error al cargar los datos del cultivo');
            } finally {
                setLoading(false);
            }
        };
        getInfo();
    }, [isUpdate, id, form]);

    const onFinish = async (values) => {
        setSubmitting(true);
        try {
            values.photo = fileName || noPhoto;

            if (isUpdate) {
                values.id = cropToUpdate.id;
                await CropService.updateCrop(values);
                openNotification("Éxito", "El cultivo ha sido actualizado satisfactoriamente", "success");
                setTimeout(() => {
                    navigate(`/crops/details/${values.id}`);
                }, 1000);
            } else {
                const result = await CropService.createCrop(values);
                openNotification("Éxito", "El cultivo ha sido creado satisfactoriamente", "success");
                setTimeout(() => {
                    navigate(`/crops/details/${result.id}`);
                }, 1000);
            }
        } catch (error) {
            console.error(error);
            openNotification(
                "Error",
                `Error al ${isUpdate ? 'actualizar' : 'crear'} el cultivo. Por favor, intente nuevamente.`,
                "error"
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleAddCropType = async (values) => {
        try {
            const newCropType = await CropTypeService.create(values);
            setCropTypes([...cropTypes, newCropType]);
            setCropTypeModalVisible(false);
            message.success('Tipo de cultivo agregado exitosamente');
            form.setFieldValue('type', newCropType.id);
        } catch (error) {
            console.error(error);
            message.error('Error al crear el tipo de cultivo');
        }
    };

    const onCancel = () => {
        navigate('/crops/find');
    };

    const handleImageUpload = (url) => {
        if (typeof url === "object") {
            url = url.file?.name || url;
        }
        setFileName(url);
        form.setFieldValue("photo", url);
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px'
            }}>
                <Spin
                    size="large"
                    indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                    tip={`Cargando datos del cultivo...`}
                />
            </div>
        );
    }

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
                                <EnvironmentOutlined style={{ color: '#1890ff' }} />
                                {isUpdate ? 'Actualizar Cultivo' : 'Crear Nuevo Cultivo'}
                            </Title>
                            <Text type="secondary">
                                {isUpdate
                                    ? 'Modifica la información del cultivo. Todos los campos marcados con * son obligatorios.'
                                    : 'Complete el formulario para crear un nuevo cultivo. Todos los campos marcados con * son obligatorios.'
                                }
                            </Text>
                        </div>

                        <Divider />

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
                                            name="photoUploader"
                                            label={
                                                <span>
                                                    <PictureOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                                                    Imagen del Cultivo
                                                </span>
                                            }
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
                                                <EnvironmentOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                                                Nombre <Text type="danger">*</Text>
                                            </span>
                                        }
                                        rules={[
                                            { required: true, message: "El nombre es obligatorio" },
                                            { min: 2, message: "El nombre debe tener al menos 2 caracteres" }
                                        ]}
                                    >
                                        <Input
                                            placeholder="Ingrese el nombre del cultivo"
                                            prefix={<EnvironmentOutlined style={{ color: '#bfbfbf' }} />}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="type"
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
                                                onClick={() => setCropTypeModalVisible(true)}
                                                style={{ padding: 0 }}
                                            >
                                                Agregar clasificación
                                            </Button>
                                        }
                                    >
                                        <Select
                                            placeholder="Seleccione una clasificación"
                                            options={memoizedCropTypes}
                                            allowClear
                                            showSearch
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            notFoundContent={<Text type="secondary">No se encontraron clasificaciones</Text>}
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
                                            placeholder="Ingrese una descripción detallada del cultivo"
                                            showCount
                                            maxLength={500}
                                        />
                                    </Form.Item>
                                </Col>

                                {/* Related Items */}
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="diseases"
                                        label={
                                            <span>
                                                <BugOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                                                Enfermedades Relacionadas
                                            </span>
                                        }
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Seleccione enfermedades relacionadas"
                                            options={memoizedDiseases}
                                            allowClear
                                            showSearch
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="products"
                                        label={
                                            <span>
                                                <MedicineBoxOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                                                Productos Relacionados
                                            </span>
                                        }
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Seleccione productos relacionados"
                                            options={memoizedProducts}
                                            allowClear
                                            showSearch
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
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
                                        icon={<SaveOutlined />}
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
                                                ? 'Actualizar Cultivo'
                                                : 'Crear Cultivo'
                                        }
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>

            {/* Crop Type Modal */}
            <Modal
                title="Agregar Clasificación"
                open={cropTypeModalVisible}
                onCancel={() => setCropTypeModalVisible(false)}
                footer={null}
            >
                <Form onFinish={handleAddCropType}>
                    <Form.Item
                        name="name"
                        label="Clasificación"
                        rules={[{ required: true, message: 'Por favor ingrese el nombre de la clasificación' }]}
                    >
                        <Input placeholder="Nombre de la clasificación" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Descripción"
                        rules={[{ required: true, message: 'Por favor ingrese una descripción' }]}
                    >
                        <Input placeholder="Descripción de la clasificación" />
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

export default CropForm;
