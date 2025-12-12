import React, { useState, useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    notification,
    Card,
    Row,
    Col,
    Typography,
    Space,
    Divider,
    Spin,
    message,
    Modal
} from 'antd';
import {
    PlusOutlined,
    SaveOutlined,
    CloseOutlined,
    EnvironmentOutlined,
    FileTextOutlined,
    AppstoreOutlined,
    PictureOutlined,
    LoadingOutlined
} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import CropService from '../../../services/Crop.service';
import CropTypeService from '../../../services/CropType.service';
import ImageUpdater from '../../components/ImageUpdater';
import appConfig from '../../../app.config';

const { Title, Text } = Typography;
const { TextArea } = Input;
const module = appConfig.modules.crops;
const noPhoto = "no-photo.png";

const UpdateCropForm = ({ id }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [cropTypes, setCropTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [initialValues, setInitialValues] = useState(null);
    const [cropTypeModalVisible, setCropTypeModalVisible] = useState(false);



    const handleImageUpload = (url) => {
        if(typeof(url) === 'object'){
            url = url.file.name;
        }
        setImageUrl(url);
        form.setFieldValue('photo', url);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [cropTypesData, cropData] = await Promise.all([
                    CropTypeService.getAll(),
                    CropService.findById(id?.id || id)
                ]);

                setCropTypes(cropTypesData);
                setInitialValues(cropData);
                setImageUrl(cropData?.photo || '');

                // Set form values after data is loaded
                if (cropData) {
                    form.setFieldsValue({
                        name: cropData.name,
                        description: cropData.description,
                        cropTypeId: cropData.cropTypeId,
                        photo: cropData.photo || '',
                    });
                }
            } catch (error) {
                console.error('Error loading crop data:', error);
                message.error('Error al cargar los datos del cultivo');
            } finally {
                setLoading(false);
            }
        };

        if (id?.id || id) {
            fetchData();
        }
    }, [id, form]);

  

    const onFinish = async (values) => {
        setSubmitting(true);
        try {
            await CropService.updateCrop(id?.id || id, {
                ...values,
                photo: imageUrl || noPhoto
            });

            notification.success({
                message: 'Éxito',
                description: 'El cultivo ha sido actualizado satisfactoriamente',
                duration: 4,
            });
            setTimeout(() => {
                navigate('/crops');
            }, 1000);
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Error',
                description: 'Error al actualizar el cultivo. Por favor, intente nuevamente.',
                duration: 4,
            });
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
            form.setFieldValue('cropTypeId', newCropType.id);
        } catch (error) {
            console.error(error);
            message.error('Error al crear el tipo de cultivo');
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
                    tip="Cargando datos del cultivo..."
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
                                Actualizar Cultivo
                            </Title>
                            <Text type="secondary">
                                Modifica la información del cultivo. Todos los campos marcados con * son obligatorios.
                            </Text>
                        </div>

                        <Divider />

                        <Form
                            form={form}
                            layout="vertical"
                            size="large"
                            onFinish={onFinish}
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
                                                <ImageUpdater
                                                    setFileName={handleImageUpload}
                                                    module={module}
                                                    file={
                                                        initialValues?.photo && typeof initialValues.photo === 'string' && initialValues.photo !== noPhoto && initialValues.photo.trim() !== '' ? {
                                                            url: `${appConfig.apiUrl}/upload${module}/${initialValues.photo}`,
                                                            uid: initialValues.photo,
                                                            name: initialValues.photo,
                                                            status: 'done',
                                                            thumbUrl: `${appConfig.apiUrl}/upload${module}/${initialValues.photo}`
                                                        } : {
                                                            name: "no-photo.png",
                                                            url: `${appConfig.apiUrl}/upload/no-photo`,
                                                            thumbUrl: `${appConfig.apiUrl}/upload/no-photo`,
                                                            uid: "-1",
                                                            status: 'done',
                                                        }
                                                    }
                                                />
                                            </div>
                                        </Form.Item>
                                        <Form.Item name="photo" hidden>
                                            <Input value={imageUrl} />
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
                                            { required: true, message: 'El nombre es obligatorio' },
                                            { min: 2, message: 'El nombre debe tener al menos 2 caracteres' }
                                        ]}
                                    >
                                        <Input
                                            placeholder="Nombre del cultivo"
                                            prefix={<EnvironmentOutlined style={{ color: '#bfbfbf' }} />}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="cropTypeId"
                                        label={
                                            <span>
                                                <AppstoreOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                                                Clasificación <Text type="danger">*</Text>
                                            </span>
                                        }
                                        rules={[
                                            { required: true, message: 'Debe seleccionar una clasificación' }
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
                                            allowClear
                                            showSearch
                                            filterOption={(input, option) =>
                                                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            notFoundContent={<Text type="secondary">No se encontraron clasificaciones</Text>}
                                        >
                                            {cropTypes.map(type => (
                                                <Select.Option key={type.id} value={type.id}>
                                                    {type.name}
                                                </Select.Option>
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
                                            placeholder="Ingrese una descripción detallada del cultivo"
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
                                        onClick={() => navigate('/crops')}
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
                                        {submitting ? 'Guardando...' : 'Actualizar Cultivo'}
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

export default UpdateCropForm;