import React, { useEffect, useState } from "react";

import { Button, Form, Input, notification, Select } from "antd";
import { useNavigate } from "react-router-dom";
import appConfig from "../../../app.config";
import CropService from "../../../services/Crop.service.jsx";
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
    const navigate = useNavigate();

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
        };
        getInfo();
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

    const onCancel = () => {
        console.log(isUpdate === true)
        isUpdate === true ? navigate('/crops/find') : clearForm();
    }

    return (
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
                        // products: crop?.products ??"",
                    }
                    : null
            }
        >
            <Form.Item name="photo" label="Foto" rules={[{ required: false }]}>
                <ImageUploaderFB
                    setFileName={setFileName}
                    module={module}
                />
                <input type="text" name="photo" value={fileName?.file?.name} hidden />
            </Form.Item>
            <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="type" label="Clasificación" rules={[{ required: true }]}>
                <Select options={[

                    { value: 1, label: <span>cereal</span> },
                    { value: 2, label: <span>leguminosa</span> },
                    { value: 3, label: <span>oleaginosa</span> },
                    { value: 4, label: <span>hortaliza</span> },
                    { value: 5, label: <span>frutal</span> },
                    { value: 6, label: <span>ornamental</span> },
                    { value: 7, label: <span>raíz</span> },
                    { value: 8, label: <span>pasto</span> }

                ]} />
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
        </Form>
    );
};

export default CropForm;
