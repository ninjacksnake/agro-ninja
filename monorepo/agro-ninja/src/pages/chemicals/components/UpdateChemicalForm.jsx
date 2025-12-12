import React, { useEffect, useState } from "react";
import { 
    Form, 
    Input, 
    Button, 
    Space, 
    Select, 
    Card, 
    Row, 
    Col, 
    Typography, 
    Spin,
    Divider,
    Upload,
    message
} from "antd";
import { 
    SaveOutlined, 
    CloseOutlined, 
    ExperimentOutlined,
    FileTextOutlined,
    AppstoreOutlined,
    PictureOutlined,
    LoadingOutlined
} from "@ant-design/icons";
import ImageUpdater from "../../components/ImageUpdater";
import ChemicalService from "../../../services/Chemical.service";
import ChemicalTypesService from "../../../services/ChemicalTypes.service";
import appConfig from "../../../app.config";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { TextArea } = Input;


const UpdateChemicalForm = ({ id }) => {
    const [form] = Form.useForm();
    const [fileName, setFileName] = useState("");
    const [currentImage, setCurrentImage] = useState(null);
    const [currentChemical, setCurrentChemical] = useState(null);
    const [chemicalTypes, setChemicalTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const module = appConfig.modules.chemicals;
    const navigate = useNavigate();
    // First useEffect for data fetching
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [chemical, types] = await Promise.all([
                    ChemicalService.findById(id),
                    ChemicalTypesService.getAll()
                ]);
                setFileName(chemical.photo);
                setCurrentChemical(chemical);
                setChemicalTypes(types.map(type => ({
                    value: type.id,
                    label: type.name
                })));
            } catch (error) {
                console.error('Error fetching data:', error);
                message.error('Error al cargar los datos del químico');
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchData();
        }
    }, [id]);

    //  updates based on state changes
    useEffect(() => {
        if (currentChemical) {
            form.setFieldsValue({
                photo: fileName || currentChemical.photo,
                name: currentChemical.name,
                description: currentChemical.description,
                type: currentChemical.chemicalType?.id
            });
            // Set current image for ImageUpdater
            if (currentChemical.photo) {
                const imageObj = {
                    name: currentChemical.photo,
                    url: `${appConfig.apiUrl}/upload${module}/${currentChemical.photo}`,
                    thumbUrl: `${appConfig.apiUrl}/upload${module}/${currentChemical.photo}`,
                    uid: currentChemical.photo,
                    status: 'done'
                };
                setCurrentImage(imageObj);
                setFileName(currentChemical.photo);
            }
        }

    }, [currentChemical, fileName, form]);

    const onFinish = async (values) => {
        setSubmitting(true);
        try {
            const updateData = {
                id: id,
                photo: fileName || values.photo || currentChemical?.photo,
                name: values.name,
                description: values.description,
                chemicalTypeId: values.type
            };
            
            const response = await api.put(`/api/chemicals/${id}`, updateData);
            
            if (response.status === 200) {
                message.success({
                    content: 'Químico actualizado exitosamente',
                    duration: 3,
                });
                setTimeout(() => {
                    navigate('/chemicals');
                }, 1000);
            }
        } catch (error) {
            console.error('Error updating chemical:', error);
            message.error({
                content: error.response?.data?.message || 'Error al actualizar el químico',
                duration: 4,
            });
        } finally {
            setSubmitting(false);
        }
    }
 

   

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
                    tip="Cargando datos del químico..."
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
                                <ExperimentOutlined style={{ color: '#1890ff' }} />
                                Actualizar Químico
                            </Title>
                            <Text type="secondary">
                                Modifica la información del químico. Todos los campos marcados con * son obligatorios.
                            </Text>
                        </div>

                        <Divider />

                        <Form
                            form={form}
                            onFinish={onFinish}
                            autoComplete="off"
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
                                            name='imgUploader'
                                            label={
                                                <span>
                                                    <PictureOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                                                    Imagen del Químico
                                                </span>
                                            }
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <ImageUpdater
                                                    setFileName={setFileName}
                                                    setCurrentImage={setCurrentImage}
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
                                        <Form.Item name='photo' hidden>
                                            <Input type="text" value={fileName} />
                                        </Form.Item>
                                    </Card>
                                </Col>

                                {/* Form Fields */}
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name='name'
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
                                        name='type'
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
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            notFoundContent={<Text type="secondary">No se encontraron tipos</Text>}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24}>
                                    <Form.Item
                                        name='description'
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
                                <Space size="large" style={{ width: '100%', justifyContent: 'flex-end' }}>
                                    <Button
                                        size="large"
                                        icon={<CloseOutlined />}
                                        onClick={() => navigate('/chemicals')}
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
                                            minWidth: 120,
                                            background: '#1890ff',
                                            borderColor: '#1890ff'
                                        }}
                                    >
                                        {submitting ? 'Guardando...' : 'Guardar Cambios'}
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )


}

export default UpdateChemicalForm;