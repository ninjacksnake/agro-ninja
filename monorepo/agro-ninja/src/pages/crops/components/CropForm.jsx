import React, { useEffect, useState, useMemo } from "react";

import { Button, Form, Input, notification, Select, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import appConfig from "../../../app.config";
import CropService from "../../../services/Crop.service.jsx";
import CropTypeService from "../../../services/CropType.service.jsx";
import ProductService from "../../../services/Product.service.jsx";
import ImageUploaderFB from "../../components/ImageUploaderFB";

//const noPhoto = require("../../../assets/images/crops/no-photos.png"); // check the folder is for the module
const module = appConfig.development.modules.crops;


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const CropForm = ({ isUpdate, crop = null }) => {
    const [form] = Form.useForm();
    const [fileName, setFileName] = useState("");
    const [products, setProducts] = useState([]);
    const [cropTypes, setCropTypes] = useState([]);
    const [cropTypeModalVisible, setCropTypeModalVisible] = useState(false);
    const navigate = useNavigate();

    const memoizedCropTypes = useMemo(() => cropTypes.map((cropType, index) => ({
        value: cropType.id,
        label: cropType.name,
    })), [cropTypes]);

    const memoizedProducts = useMemo(() => products.map((product, index) => ({
        value: product.id,
        label: product.name,
    })), [products]);

    const openNotification = (title, body) => {
        notification.open({
            message: `${title}`,
            description: `${body}`,
            placement: "topRight",
            style: {
                backgroundColor: title === "Error" ? "#EB8696" : "beige",
            },
        });
    };

    const clearForm = () => {
        form.resetFields();
    };


    useEffect(() => {
        const getInfo = async () => {
            if (isUpdate) {
                setFileName(crop.photo);
            }
            const productsDb = await ProductService.Products.findAll();
            setProducts(productsDb);
            const cropTypesDb = await CropTypeService.Crops.findAll();
            setCropTypes(cropTypesDb);
        };
        getInfo();
        console.log(products)
    }, []);
    
    const onFinish = (values) => {
        if (isUpdate) {
            values.id = crop.id;
            if (values.photo !== fileName?.file?.name) {
                values.photo = fileName?.file?.name;
            }
            return CropService.Crops
                .updateCrop(values)
                .then((result) => {
                    console.log(result)
                    openNotification("Success", "Your crop has been updated");
                    navigate(`/crops/details/${result.id}`);
                })
                .catch((error) => {
                    console.log(error);
                    openNotification("Fail", "Failed updating your crop  ");
                });
        } else {

            values.photo = fileName?.file?.name; // default no photo photo
            return CropService.Crops
                .createCrop(values)
                .then((result) => {
                    console.log(result)
                    openNotification("Success", "Has creado un cultivo");
                    navigate(`/crops/details/${result.id}`);
                })
                .catch((error) => {
                    console.log(error);
                    openNotification("Fail", "Falló al creal el cultivo");
                });
        }
    };


    const handleAddCropType = (values) => {
        CropService.Crops
            .createCropType(values)
            .then((result) => {
                openNotification("Success", "Has creado un tipo de cultivo");
                setCropTypeModalVisible(false);
            })
    };
    const onCancel = () => {
        console.log(isUpdate === true)
        isUpdate === true ? navigate('/crops/find') : clearForm();
    }

    return (
        <div>
            <Form
                {...layout}
                form={form}
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                initialValues={
                    isUpdate
                        ? {
                            name: crop?.name ?? "",
                            photo: crop?.photo ?? "",
                            description: crop?.description ?? "",
                            products: crop?.products ?? "",
                            type: crop?.type ?? "",
                        }
                        : null
                }
            >
                <Form.Item name="photoUploader" label="Guardar Imagen" rules={[{ required: false }]} >
                    <ImageUploaderFB
                        setFileName={setFileName}
                        module={module}
                    />
                </Form.Item>
                <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="type" label="Clasificación" rules={[{ required: true }]}>
                    <Select options={memoizedCropTypes} />
                </Form.Item>

                <Form.Item name="products" label="Productos Relacionados" rules={[{ required: false }]}>
                    <Select
                        options={memoizedProducts}
                        mode="multiple"
                    />
                </Form.Item>


                <Form.Item
                    name="description"
                    label="Descripción"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: "8px" }}>
                        Guardar
                    </Button>

                    <Button htmlType="button" onClick={onCancel}>
                        Cancelar
                    </Button>
                </Form.Item>
                <Form.Item label="" rules={[{ required: true }]} >
                    <Input type="text" name="photo" value={fileName?.file?.name} style={{ visibility: "hidden" }} />
                </Form.Item>
            </Form>

            <Modal
                title="Agregar Tipo de Cultivo"
                open={cropTypeModalVisible}
                onCancel={() => setCropTypeModalVisible(false)}
                footer={null}
            >
                <Form onFinish={handleAddCropType}>
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


        </div>
    );
};

export default CropForm;
