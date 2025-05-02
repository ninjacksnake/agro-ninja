import React, { useEffect, useState } from 'react';

import { Modal, Button, Form, Input, Select, Upload, message, notification } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import ImageUploaderFB from '../../components/ImageUploaderFB.jsx';
import ProductService from '../../../services/Product.service.jsx';
import CategoryService from '../../../services/CategoriesService.jsx';
import ChemicalService from '../../../services/Chemical.service.jsx';
import CropService from '../../../services/Crop.service.jsx';
import Diseaseservice from '../../../services/Disease.service.jsx';
import { useNavigate } from 'react-router-dom';
import appConfig from '../../../app.config.js';
import ImageUpdater from '../../components/ImageUpdater.jsx';

const { TextArea } = Input;
const { Option } = Select;

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
    const navigate = useNavigate();
    const module = appConfig.modules.products;

    useEffect(() => {
       
        const getInfo = async () => {
            try {
                const [dbProduct, dbChemicals, dbCategories, dbdiseases, crops] = await Promise.all([
                    ProductService.findById(id),
                    ChemicalService.findAll(),
                    CategoryService.FindAll(),
                    Diseaseservice.findAll(),
                    CropService.findAll(),
                ])
                setProduct(dbProduct);
                setFileName(dbProduct.photo);
                setComponents((ch) => dbChemicals);
                setCategories((ca) => dbCategories);
                setDiseases((d) => dbdiseases);
                setCrops((c) => crops);
console.log(product)
            } catch (error) {
                console.log(error);
                openNotification("Fail", "No se pudo cargar los datos");
            }
        };
        getInfo();
     
    }, [id])

    useEffect(() => {
        if(product.id){
           
            form.setFieldsValue({
                photo: fileName,
                name: product.name,
                description: product.description,
                categoryId: product.categoryId,
                dossage: product.dossage,
                chemicals: product.chemicals.map((chemical) => chemical.name),
                diseases: product.diseases.map((disease) => disease.name),
                crops: product.crops.map((crop) => crop.name),
            });
        }
      
 
    }, [product, fileName, form])



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
        // console.log("onFinish", values);

        values.id = product.id;
        values.photo = fileName || "";
        return ProductService.updateProduct(values)
            .then((result) => {
                openNotification("Success", "El Producto ha sido actualizado");
                navigate(`/products/details/${values.id}`, { state: result });
            })
            .catch((error) => {
                console.log(error);
                openNotification("Fail", "El Producto no ha sido actualizado");
            });

    }

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
    // adding a new image object for the image uploader
    var existingImagePath = {
        name: product?.photo,
        url: appConfig.apiUrl + "/upload/products/" + product?.photo,
        thumbUrl: appConfig.apiUrl + "/upload/products/" + product?.photo,
        uid: product?.photo,
        status: 'done',
    }
    // appConfig.apiUrl + "/upload/" + product?.photo;
    return (
        <div style={{ padding: 10, border: '1px solidrgb(78, 78, 78)', borderRadius: 5, boxShadow: '0 0 5px rgba(1, 2, 1, 0.57)', width: '50%', }}>
            <Form
                form={form}
                layout="horizontal"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 20 }}
                size='medium'
                onFinish={onFinish}
                onFinishFailed={handleFinishFailed}
               
            >
                <Form.Item name="imgUploader" label="" rules={[{ required: false }]}>
                    
                <ImageUpdater setFileName={setFileName} module={module} file={existingImagePath} />
                </Form.Item>
                <Form.Item name="photo" label="" rules={[{ required: false }]} hidden>
                    <Input type="text" name="photo" value={fileName}  />
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
                    name="diseases"
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
                    rules={[{ required: false, message: 'Por favor ingrese cultivos relacionados!' }]}
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

export default UpdateProductForm;