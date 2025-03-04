import React, { useState } from 'react';

import { Modal, Button, Form, Input, Select, Upload, message, notification } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import ImageUploaderFB from '../../components/ImageUploaderFB';
import ProductService from '../../../services/Product.service';
import CategoryService from '../../../services/CategoriesService';
import ChemicalService from '../../../services/Chemical.service.jsx';
import CropService from '../../../services/Crop.service.jsx';
import Diseaseservice from '../../../services/Dicease.service.jsx';
import { useNavigate } from 'react-router-dom';
import appConfig from '../../../app.config.js';

const { TextArea } = Input;
const { Option } = Select;

const ProductForm2 = ({ isUpdate, product, productId }

) => {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const [components, setComponents] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [crops, setCrops] = useState([]);
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [componentModalVisible, setComponentModalVisible] = useState(false);
    const [diseaseModalVisible, setDiseaseModalVisible] = useState(false);
    const [fileName, setFileName] = useState(null);
    const navigate = useNavigate();
    const module = appConfig.development.modules.products



    useState(() => {
        console.log('ProductForm2', product);
        setFileName({ file: { name: product?.photo } });
        const getInfo = async () => {
            const dbChemicals = await ChemicalService.Chemicals.findAll();
            setComponents((ch) => dbChemicals);
            const dbCategories = await CategoryService.Categories.FindAll();
            // console.log('dbCategories', dbCategories);
            setCategories((ca) => dbCategories);
            const dbdiseases = await Diseaseservice.diceases.findAll();
            setDiseases((d) => dbdiseases);
            const crops = await CropService.Crops.findAll();
            setCrops((c) => crops);
            console.log('crops', crops);
        };
        getInfo();

    }, [isUpdate])


    // const handleFinish = (values) => {
    //     console.log('Form values:', values);
    //     message.success('Product saved successfully!');
    // };
    const openNotification = (title, body, reason = "") => {
        notification.open({
            message: `${title}`,
            description: `${body} ${reason}`,
            placement: "topRight",
            style: {
                backgroundColor: title === "Error" ? "#EB8696" : "beige",
            },
        });
    };

    // function to finish the form
    const onFinish = (values) => {
        //console.log("onFinish", values);
        if (isUpdate) {
            values.id = product.id;
            values.photo = fileName?.file?.name || "";
            return ProductService.Products.updateProduct(values)
                .then((result) => {
                    openNotification("Success", "El Producto ha sido actualizado");
                    navigate(`/products/details/${values.id}`, { state: result });
                })
                .catch((error) => {
                    console.log(error);
                    openNotification("Fail", "El Producto no ha sido actualizado");
                });
        } else {
            values.photo = fileName?.file?.name || "";
            return ProductService.Products.createProduct(values)
                .then((result) => {
                    openNotification("Success", "El producto ha sido creado");
                    navigate(`/products/details/${result.id}`, { state: result });
                })
                .catch((error) => {
                    console.log(error);
                    openNotification(
                        "Fail",
                        "El producto no ha sido creado, ",
                        error.request.response
                    );
                });
        }
    };

    const handleFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('Failed to save product!');
    };

    const handleAddCategory = (values) => {
        setCategories([...categories, values.category]);
        setCategoryModalVisible(false);
    };

    const handleAddComponent = (values) => {
        setComponents([...components, values.component]);
        setComponentModalVisible(false);
    };

    const handleAddDisease = (values) => {
        setDiseases([...diseases, values.disease]);
        setDiseaseModalVisible(false);
    };

    return (
        <div style={{ padding: 20, border: '1px solidrgb(78, 78, 78)', borderRadius: 5, boxShadow: '0 0 5px rgba(1, 2, 1, 0.57)', width: '50%', }}>
            <Form
                form={form}
                layout="horizontal"
                labelCol={{ span: 8 }}

                wrapperCol={{ span: 16 }}
                size='medium'
                onFinish={onFinish}
                onFinishFailed={handleFinishFailed}
                initialValues={
                    isUpdate
                        ? {
                            name: product?.name ?? "",
                            photo: product?.photo ?? "",
                            description: product?.description ?? "",
                            imageLocation: product?.photo ?? "",
                            categoryId: product?.categoryId ?? "",
                            dossage: product?.dossage ?? 0,
                            chemicals:
                                product?.chemicals?.map((chemical) => chemical.name) ?? [],
                            diceases:
                                product?.diceases?.map((chemical) => chemical.name) ?? [],
                            crops:
                                product?.Crops?.map((crop) => crop.name) ?? [],
                        }
                        : null
                }
            >
                <Form.Item name="photo" label="Foto" rules={[{ required: false }]}>
                    <ImageUploaderFB setFileName={setFileName} module={module} />
                    <input type="text" name="photo" value={fileName?.file?.name} hidden />

                </Form.Item>

                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input the product name!' }]}
                    placeholder="Product name"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please input the product description!' }]}
                    placeholder="Product description"
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name="categoryId"
                    label="Categoría"
                    rules={[
                        { required: false, message: "La categoría no puede estar vacío" },
                    ]}
                >
                    <Select
                        // name="categoryId"
                        placeholder="Seleccione una categoría"
                        allowClear
                        size="middle"
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Button type="link" onClick={() => setCategoryModalVisible(true)}>
                                    <PlusOutlined /> Agregar categoría
                                </Button>
                            </>
                        )}
                    >
                        {categories.map((category, index) => (
                            <Option value={category.id} key={index}>
                                {category.name}
                            </Option>
                        ))}

                    </Select>
                </Form.Item>

                <Form.Item
                    name="chemicals"
                    label="Components"
                    rules={[{ required: true, message: 'Favor seleccionar al menos un componente!' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Seleccionar componentes"
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Button type="link" onClick={() => setComponentModalVisible(true)}>
                                    <PlusOutlined /> Add component
                                </Button>
                            </>
                        )}
                    >
                        {components.map((component, index) => (
                            <Option key={component.name} value={component.name}>
                                {component.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="diceases"
                    label="Enfermedades"
                    rules={[{ required: true, message: 'Please select diseases!' }]}
                >
                    <Select
                        mode="multiple"
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Button type="link" onClick={() => setDiseaseModalVisible(true)}>
                                    <PlusOutlined /> Add disease
                                </Button>
                            </>
                        )}
                    >
                        {diseases.map((disease, index) => (
                            <Option key={disease.name} value={disease.name}>
                                {disease.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="crops"
                    label="Cultivos"
                    rules={[{ required: true, message: 'Por favor ingrese cultivos relacionados!' }]}
                >
                    <Select
                        mode="multiple"
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Button type="link" onClick={() => setDiseaseModalVisible(true)}>
                                    <PlusOutlined /> Agregar Cultivo
                                </Button>
                            </>
                        )}
                    >
                        {crops.map((crop, index) => (
                            <Option key={crop.name} value={crop.id}>
                                {crop.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="dossage"
                    label="Dosification"
                    rules={[{ required: true, message: 'Por favor ponga la dosificacion!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="default" style={{ marginRight: 8 }} onClick={() => navigate('/products/find')}>
                        back
                    </Button>
                    <Button type="primary" htmlType="submit" style={{}}>
                        Update
                    </Button>
                </Form.Item>
            </Form>

            <Modal
                title="Add Category"
                open={categoryModalVisible}
                onCancel={() => setCategoryModalVisible(false)}
                footer={null}
            >
                <Form onFinish={handleAddCategory}>
                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'Please input the category!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Add Component"
                open={componentModalVisible}
                onCancel={() => setComponentModalVisible(false)}
                footer={null}
            >
                <Form onFinish={handleAddComponent}>
                    <Form.Item
                        name="component"
                        label="Component"
                        rules={[{ required: true, message: 'Please input the component!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Add Disease"
                open={diseaseModalVisible}
                onCancel={() => setDiseaseModalVisible(false)}
                footer={null}
            >
                <Form onFinish={handleAddDisease}>
                    <Form.Item
                        name="disease"
                        label="Disease"
                        rules={[{ required: true, message: 'Please input the disease!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductForm2;