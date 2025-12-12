import React, { useEffect, useState } from 'react';
import { 
    Modal, 
    Button, 
    Form, 
    Input, 
    Select, 
    message, 
    notification,
    Card,
    Row,
    Col,
    Typography,
    Space,
    Divider,
    Spin
} from 'antd';
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
} from '@ant-design/icons';
import ProductService from '../../../services/Product.service.jsx';
import CategoryService from '../../../services/CategoriesService.jsx';
import ChemicalService from '../../../services/Chemical.service.jsx';
import CropService from '../../../services/Crop.service.jsx';
import Diseaseservice from '../../../services/Disease.service.jsx';
import { useNavigate } from 'react-router-dom';
import appConfig from '../../../app.config.js';
import ImageUpdater from '../../components/ImageUpdater.jsx';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const noPhoto = "no-photo.png";

const UpdateProductForm = ({ id }) => {
    const [form] = Form.useForm();
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [components, setComponents] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [crops, setCrops] = useState([]);
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [componentModalVisible, setComponentModalVisible] = useState(false);
    const [diseaseModalVisible, setDiseaseModalVisible] = useState(false);
    const [fileName, setFileName] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const module = appConfig.modules.products;

    useEffect(() => {
        const getInfo = async () => {
            setLoading(true);
            try {
                const [dbProduct, dbChemicals, dbCategories, dbdiseases, dbCrops] = await Promise.all([
                    ProductService.findById(id),
                    ChemicalService.findAll(),
                    CategoryService.FindAll(),
                    Diseaseservice.findAll(),
                    CropService.findAll(),
                ]);
                setProduct(dbProduct);
                setFileName(dbProduct.photo);
                setComponents(dbChemicals);
                setCategories(dbCategories);
                setDiseases(dbdiseases);
                setCrops(dbCrops);
                
                // Set current image for ImageUpdater
                if (dbProduct.photo) {
                    const imageObj = {
                        name: dbProduct.photo,
                        url: `${appConfig.apiUrl}/upload${module}/${dbProduct.photo}`,
                        thumbUrl: `${appConfig.apiUrl}/upload${module}/${dbProduct.photo}`,
                        uid: dbProduct.photo,
                        status: 'done'
                    };
                    setCurrentImage(imageObj);
                }
            } catch (error) {
                console.error(error);
                message.error('Error al cargar los datos del producto');
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            getInfo();
        }
    }, [id]);

    useEffect(() => {
        if(product.id){
            form.setFieldsValue({
                photo: fileName || product.photo,
                name: product.name,
                description: product.description,
                categoryId: product.categoryId,
                dossage: product.dossage,
                chemicals: product.chemicals?.map((chemical) => chemical.name) || [],
                diseases: product.diseases?.map((disease) => disease.name) || [],
                crops: product.crops?.map((crop) => crop.id) || [],
            });
        }
    }, [product, fileName, form]);



    const openNotification = (title, body, type = "success") => {
        notification[type === "error" ? "error" : "success"]({
            message: title,
            description: body,
            placement: "topRight",
            duration: 4,
        });
    };

    // function to finish the form
    const onFinish = async (values) => {
        setSubmitting(true);
        try {
            values.id = product.id;
            values.photo = fileName || product.photo || "";
            const result = await ProductService.updateProduct(values);
            openNotification("Éxito", "El producto ha sido actualizado satisfactoriamente", "success");
            setTimeout(() => {
                navigate(`/products/details/${values.id}`, { state: result });
            }, 1000);
        } catch (error) {
            console.error(error);
            openNotification("Error", "Error al actualizar el producto. Por favor, intente nuevamente.", "error");
        } finally {
            setSubmitting(false);
        }
    }

    const handleFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('Por favor, complete todos los campos requeridos');
    };

    const handleAddCategory = async (values) => {
        try {
            const newCategory = await CategoryService.Create({ 
                name: values.category,
                description: values.category 
            });
            setCategories([...categories, newCategory]);
            setCategoryModalVisible(false);
            message.success('Categoría agregada exitosamente');
        } catch (error) {
            console.error(error);
            message.error('Error al crear la categoría');
        }
    };

    const handleAddComponent = async (values) => {
        try {
            // Use first available chemical type ID from existing components, or default to 1
            const defaultTypeId = components.length > 0 && components[0].chemicalType?.id 
                ? components[0].chemicalType.id 
                : 1;
            
            const newComponent = await ChemicalService.createChemical({ 
                name: values.component,
                description: values.component,
                photo: noPhoto,
                chemicalTypeId: defaultTypeId
            });
            setComponents([...components, newComponent]);
            setComponentModalVisible(false);
            message.success('Componente agregado exitosamente');
        } catch (error) {
            console.error(error);
            message.error('Error al crear el componente. Asegúrese de que existe al menos un tipo de químico.');
        }
    };

    const handleAddDisease = async (values) => {
        try {
            const newDisease = await Diseaseservice.create({ 
                name: values.disease,
                description: values.disease,
                photo: noPhoto,
                diseaseTypeId: 1 // Default type, should be improved
            });
            setDiseases([...diseases, newDisease]);
            setDiseaseModalVisible(false);
            message.success('Enfermedad agregada exitosamente');
        } catch (error) {
            console.error(error);
            message.error('Error al crear la enfermedad');
        }
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
                    tip="Cargando datos del producto..."
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
                                <ShoppingOutlined style={{ color: '#1890ff' }} />
                                Actualizar Producto
                            </Title>
                            <Text type="secondary">
                                Modifica la información del producto. Todos los campos marcados con * son obligatorios.
                            </Text>
                        </div>

                        <Divider />

                        <Form
                            form={form}
                            layout="vertical"
                            size="large"
                            onFinish={onFinish}
                            onFinishFailed={handleFinishFailed}
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
                                            name="imgUploader"
                                            label={
                                                <span>
                                                    <PictureOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                                                    Imagen del Producto
                                                </span>
                                            }
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <ImageUpdater 
                                                    setFileName={setFileName} 
                                                    module={module} 
                                                    file={currentImage || {
                                                        name: "no-photo.png",
                                                        url: `${appConfig.apiUrl}/upload/no-photo`,
                                                        thumbUrl: `${appConfig.apiUrl}/upload/no-photo`,
                                                        uid: "-1",
                                                        status: 'done',
                                                    }} 
                                                />
                                            </div>
                                        </Form.Item>
                                        <Form.Item name="photo" hidden>
                                            <Input type="text" value={fileName || product.photo} />
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
                                            { required: true, message: 'El nombre es obligatorio' },
                                            { min: 2, message: 'El nombre debe tener al menos 2 caracteres' }
                                        ]}
                                    >
                                        <Input 
                                            placeholder="Nombre del producto"
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
                                                onClick={() => setCategoryModalVisible(true)}
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
                                            { required: true, message: 'La descripción es obligatoria' },
                                            { min: 10, message: 'La descripción debe tener al menos 10 caracteres' }
                                        ]}
                                    >
                                        <TextArea
                                            rows={4}
                                            placeholder="Descripción detallada del producto"
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
                                            { required: true, message: 'Debe seleccionar al menos un componente' }
                                        ]}
                                        extra={
                                            <Button
                                                type="link"
                                                size="small"
                                                icon={<PlusOutlined />}
                                                onClick={() => setComponentModalVisible(true)}
                                                style={{ padding: 0 }}
                                            >
                                                Agregar componente
                                            </Button>
                                        }
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Seleccione componentes"
                                            allowClear
                                            showSearch
                                            filterOption={(input, option) =>
                                                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                        >
                                            {components.map((component) => (
                                                <Option key={component.name} value={component.name}>
                                                    {component.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                {/* Diseases Section */}
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="diseases"
                                        label={
                                            <span>
                                                <BugOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                                                Enfermedades <Text type="danger">*</Text>
                                            </span>
                                        }
                                        rules={[
                                            { required: true, message: 'Debe seleccionar al menos una enfermedad' }
                                        ]}
                                        extra={
                                            <Button
                                                type="link"
                                                size="small"
                                                icon={<PlusOutlined />}
                                                onClick={() => setDiseaseModalVisible(true)}
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
                                            {diseases.map((disease) => (
                                                <Option key={disease.name} value={disease.name}>
                                                    {disease.name}
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
                                                <Option key={crop.id} value={crop.id}>
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
                                            { required: true, message: 'La dosificación es obligatoria' }
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
                                        onClick={() => navigate('/products')}
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
                                        {submitting ? 'Guardando...' : 'Actualizar Producto'}
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>

            {/* Modals */}
            <Modal
                title="Agregar Categoría"
                open={categoryModalVisible}
                onCancel={() => setCategoryModalVisible(false)}
                footer={null}
            >
                <Form onFinish={handleAddCategory}>
                    <Form.Item
                        name="category"
                        label="Categoría"
                        rules={[{ required: true, message: 'Por favor ingrese el nombre de la categoría' }]}
                    >
                        <Input placeholder="Nombre de la categoría" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Agregar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Agregar Componente"
                open={componentModalVisible}
                onCancel={() => setComponentModalVisible(false)}
                footer={null}
            >
                <Form onFinish={handleAddComponent}>
                    <Form.Item
                        name="component"
                        label="Componente"
                        rules={[{ required: true, message: 'Por favor ingrese el nombre del componente' }]}
                    >
                        <Input placeholder="Nombre del componente" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Agregar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Agregar Enfermedad"
                open={diseaseModalVisible}
                onCancel={() => setDiseaseModalVisible(false)}
                footer={null}
            >
                <Form onFinish={handleAddDisease}>
                    <Form.Item
                        name="disease"
                        label="Enfermedad"
                        rules={[{ required: true, message: 'Por favor ingrese el nombre de la enfermedad' }]}
                    >
                        <Input placeholder="Nombre de la enfermedad" />
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

export default UpdateProductForm;